/*
Copyright © 2016 Jon Allen <ylixir@gmail.com>
Copyright © 2016 erik4999 <erik4999@users.noreply.github.com>
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See the COPYING file for more details.
 */

game.module('game.main').body(function() {

	chanceToDie = 0
	liveCheckTime = 1500 // in milliseconds?

	game.addAsset('panda.png')

	game.createScene('Main', {
		backgroundColor : '#B3DBE9',
		wallSize : 4,
		totalNumberOfCells : 18,
		numberOfCellsOutsideWall : 0,
		init : function() {
			this.numberOfCellsOutsideWall = (this.totalNumberOfCells - this.wallSize) / 2
			console.log('Press ctl-shift-i in chrome to see this')

			var cellSize = new game.Vector(game.width / this.totalNumberOfCells, game.height / this.totalNumberOfCells)

			this.world = new game.World()
			this.world.gravity.set(0, 0)
			var wall = new game.Body()
			wall.position.set(game.width / 2, game.height / 2)
			wall.static = true
			wall.addShape(new game.Rectangle(cellSize.x * this.wallSize, cellSize.y * this.wallSize, cellSize.x * this.numberOfCellsOutsideWall, cellSize.y * this.numberOfCellsOutsideWall))
			wall.addTo(this.world)
			// ///////////////////////////////////////////////////
			// I KNOW THE MATHEMATICIAN CAN FIGURE OUT A BETTER WAY TO DO THIS! DRAW THE GRID
			// sigh...fracking comp sci people.
			// done with love,
			// ylixir
			// p.s. if you ever need help figuring out the difference
			// between a star and a grid, let me
			// know.
			// /////////////////////////////////////////////////////////
			var grap = new game.Graphics()
			// the home base
			grap.fillColor = '#666'
			// drag grey wall box
			grap.drawRect(wall.shape.x, wall.shape.y, wall.shape.width, wall.shape.height)
			// the grid
			grap.fillColor = '#000000'
			// this will draw four "lanes" of dots cellSize.y apart from each other
			for (var i = 0; i < this.wallSize; i++) {
				for (var j = 0; j < this.totalNumberOfCells; j++) {
					grap.drawCircle(cellSize.x / 2 + cellSize.x * (this.numberOfCellsOutsideWall + i), cellSize.y / 2 + cellSize.y * j, 5)
					grap.drawCircle(cellSize.x / 2 + cellSize.x * j, cellSize.y / 2 + cellSize.y * (this.numberOfCellsOutsideWall + i), 5)
				}
			}
			grap.addTo(game.scene.stage)

			this.player = new game.swashbuckler()
			this.addTimer(liveCheckTime, function() {
				if (Math.random(0, 1) < 1 - chanceToDie) {
					// Math.random gives a value in the interval: [min,max)
					var position
					// get the axis
					if (Math.floor(Math.random(0, 2)))
						position = new game.Vector(1, 0)
					else
						position = new game.Vector(0, 1)
					var bearing = new game.Vector(position.y, position.x)
					bearing.multiply(2 * Math.floor(Math.random(0, 2)) - 1)
					// get the lane
					position.multiply(Math.floor(Math.random(1, 5)))

					// do math, make everything like it should be
					position.multiply(cellSize.x, cellSize.y)
					if (position.x) {
						position.y = -(bearing.y - 1) / 2 * game.height
						position.x += cellSize.x * 6
					} else {
						position.x = -(bearing.x - 1) / 2 * game.width
						position.y += cellSize.y * 6
					}
					bearing.multiply(100)

					var pirate = new game.scurvydog(position.x, position.y, bearing.x, bearing.y)
				}

			}, true)

		},
		keydown : function(key) {
			if (key == 'SPACE') {
				this.player.poop()
			}
		}
	})

})
