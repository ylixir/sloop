/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab : */ 

/* Copyright © 2016 Jon Allen <ylixir@gmail.com>
 * Copyright © 2016 erik4999 <erik4999@users.noreply.github.com>
 * This work is free. You can redistribute it and/or modify it under the
 * terms of the Do What The Fuck You Want To Public License, Version 2,
 * as published by Sam Hocevar. See the COPYING file for more details.
 */

/* global game */

game.module('game.main').body(function() {

	var spawnRate = 1000; // in milliseconds?
    lanes = [];//this is gonna have all the lanes, with their bearings, etc.
    laneCount = 4; //this is the number of lanes in one direction, not total
    bullets = [];

	game.addAsset('panda.png');
	game.addAsset('bullet.png');

	game.createScene('Main', {
		backgroundColor : '#B3DBE9',
    laneOffset : 0, //unit is cells
		cellsAcross : 18,
		//laneCount : 6,
		//cellsAcross : 10,
		init : function() {
			this.laneOffset = (this.cellsAcross - laneCount) / 2;
			console.log('Press ctl-shift-i in chrome to see this');

			var cellSize = new game.Vector( game.width / this.cellsAcross,
                                            game.height / this.cellsAcross);

			this.world = new game.World();
			this.world.gravity.set(0, 0);
			var wall = new game.Body();
			wall.static = true;
			wall.position.set(
                cellSize.x*(this.laneOffset+laneCount/2),
                cellSize.y*(this.laneOffset+laneCount/2)
            );
            //magic number 1.5 gets the sprites in the box,
            //but still causes collision on edge sprites
			wall.addShape( new game.Rectangle(
                    cellSize.x * (laneCount-1.5),
                    cellSize.y * (laneCount-1.5)
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
                    cellSize.x * laneCount,
                    cellSize.y * laneCount
            );
			// the grid
			grafx.fillColor = '#000000';
			// loop once for each lane, horiz and vert lanes drawn at same time
			for (var i = 0; i < laneCount; i++) {
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
                //while we are here...fill out the lane data structures too
                lanes.push(new game.lane(
                        cellSize.x/2,
                        cellSize.y*(1/2+this.laneOffset+i),
                        cellSize.x, 0));
                lanes.push(new game.lane(
                        game.width-cellSize.x/2,
                        cellSize.y*(1/2+this.laneOffset+i),
                        -cellSize.x, 0));
                lanes.push(new game.lane(
                        cellSize.x*(1/2+this.laneOffset+i),
                        cellSize.y/2,
                        0, cellSize.y));
                lanes.push(new game.lane(
                        cellSize.x*(1/2+this.laneOffset+i),
                        game.height-cellSize.y/2,
                        0, -cellSize.y));
 			}
			grafx.addTo(game.scene.stage);

			this.player = new game.swashbuckler();
			this.addTimer(spawnRate, function() {
                var l = Math.floor(Math.random(0,laneCount*4));
                lanes[l].spawn();
			}, true);

		},
		 keydown: function(key) {
		        if (key === 'SPACE') {
		        	bullets.unshift( new game.bullet(player.sprite.position.x, player.sprite.position.y, 0));
		        	
		        }
		        if (key === 'P')
		        	window.alert("Length"+bullets.length);
		    },
  });

});
