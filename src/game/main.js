/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab : */ 

/*
Copyright © 2016 Jon Allen <ylixir@gmail.com>
Copyright © 2016 erik4999 <erik4999@users.noreply.github.com>
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See the COPYING file for more details.
 */

/* global game */

game.module('game.main').body(function() {

	var spawnRate = 1500; // in milliseconds?
    var lanes = {}; //this is gonna have all the lanes, with their bearings, etc.

	game.addAsset('panda.png');

	game.createScene('Main', {
		backgroundColor : '#B3DBE9',
		laneCount : 4, //this is the number of lanes in one direction, not total
		cellsAcross : 18,
		//laneCount : 6,
		//cellsAcross : 10,
		laneOffset : 0, //unit is cells
		init : function() {
			this.laneOffset = (this.cellsAcross - this.laneCount) / 2;
			console.log('Press ctl-shift-i in chrome to see this');

			var cellSize = new game.Vector( game.width / this.cellsAcross,
                                            game.height / this.cellsAcross);

			this.world = new game.World();
			this.world.gravity.set(0, 0);
			var wall = new game.Body();
			wall.static = true;
			wall.position.set(
                cellSize.x*(this.laneOffset+this.laneCount/2),
                cellSize.y*(this.laneOffset+this.laneCount/2)
            );
            //magic number 1.5 gets the sprites in the box,
            //but still causes collision on edge sprites
			wall.addShape( new game.Rectangle(
                    cellSize.x * (this.laneCount-1.5),
                    cellSize.y * (this.laneCount-1.5)
            ));
			wall.addTo(this.world);

			// ///////////////////////////////////////////////////
			// I KNOW THE MATHEMATICIAN CAN FIGURE OUT A BETTER WAY TO DO THIS! DRAW THE GRID
			// sigh...fracking comp sci people.
			// done with love,
			// ylixir
			// p.s. if you ever need help figuring out the difference
			// between a star and a grid, let me
			// know.
			// /////////////////////////////////////////////////////////
			var grafx = new game.Graphics();
			// the home base, a grey box
			grafx.fillColor = '#666';
			grafx.drawRect(
                    cellSize.x * this.laneOffset,
                    cellSize.y * this.laneOffset,
                    cellSize.x * this.laneCount,
                    cellSize.y * this.laneCount
            );
			// the grid
			grafx.fillColor = '#000000';
			// loop once for each lane, horiz and vert lanes drawn at same time
			for (var i = 0; i < this.laneCount; i++) {
                // loop through the cells in the current lane
				for (var j = 0; j < this.cellsAcross; j++) {
                    //draw the cell in the vertical lane
					grafx.drawCircle(
                        cellSize.x*(1/2 + this.laneOffset + i),
                        cellSize.y*(1/2 + j),
                        5
                    );
                    //draw the cell in the horizontal lane
					grafx.drawCircle(
                        cellSize.x*(1/2 + j),
                        cellSize.y*(1/2 + this.laneOffset + i),
                        5
                    );
				}
			}
			grafx.addTo(game.scene.stage);

			this.player = new game.swashbuckler();
			this.addTimer(spawnRate, function() {
                // Math.random gives a value in the interval: [min,max)
                var position;
                // get the axis
                if (Math.floor(Math.random(0, 2)))
                    position = new game.Vector(1, 0);
                else
                    position = new game.Vector(0, 1);
                var bearing = new game.Vector(position.y, position.x);
                bearing.multiply(2 * Math.floor(Math.random(0, 2)) - 1);
                // get the lane
                position.multiply(Math.floor(Math.random(1, 5)));

                // do math, make everything like it should be
                position.multiply(cellSize.x, cellSize.y);
                if (position.x) {
                    position.y = -(bearing.y - 1) / 2 * game.height;
                    position.x += cellSize.x * 6;
                }
                else {
                    position.x = -(bearing.x - 1) / 2 * game.width;
                    position.y += cellSize.y * 6;
                }
                bearing.multiply(100);

                var pirate = new game.scurvydog(position.x, position.y, bearing.x, bearing.y);
			}, true);

		},
		keydown : function(key) {
			if (key === 'SPACE') {
				this.player.poop();
			}
		}
	});

});
