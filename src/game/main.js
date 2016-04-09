/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab : */ 

/* Copyright © 2016 Jon Allen <ylixir@gmail.com>
 * Copyright © 2016 erik4999 <erik4999@users.noreply.github.com>
 * This work is free. You can redistribute it and/or modify it under the
 * terms of the Do What The Fuck You Want To Public License, Version 2,
 * as published by Sam Hocevar. See the COPYING file for more details.
 */

/* global game */

game.module('game.main').body(function() {

	framesPerSecond = 1000; // in milliseconds?
    spawnPorts = []; //this is gonna have all the spawnports, with their bearings, and the dogs
    bullets = [];
    laneCount = 4; //this is the number of lanes in one direction, not total
    laneOffset = 0;
    cellsAcross = 18;
    
	game.addAsset('panda.png');
	game.addAsset('bullet.png');
	
	game.createScene('Main', {
		backgroundColor : '#B3DBE9',
		init : function() {
			
			laneOffset = (cellsAcross - laneCount) / 2;
			console.log('Press ctl-shift-i in chrome to see this');

			cellSize = new game.Vector(game.width / cellsAcross, game.height / cellsAcross);

			this.world = new game.World();
			this.world.gravity.set(0, 0);
			wall = new game.Body();
			wall.static = true;
			wall.position.set(
                cellSize.x * ((laneOffset + laneCount) / 2),
                cellSize.y * ((laneOffset+laneCount) / 2)
            );
			
            //magic number 1.5 gets the sprites in the box,
            //but still causes collision on edge sprites
			wall.addShape(new game.Rectangle(
                    cellSize.x * (laneCount - 1.5),
                    cellSize.y * (laneCount - 1.5)
            ));
			
			wall.addTo(this.world);
			
			// graphics to draw all the objects in the scene
			grafx = new game.Graphics();
			grafx.fillColor = '#666';
			grafx.drawRect(
                    cellSize.x * laneOffset,
                    cellSize.y * laneOffset,
                    cellSize.x * laneCount,
                    cellSize.y * laneCount
            );
			// the grid
			grafx.fillColor = '#000000';
			// loop once for each lane, horiz and vert lanes drawn at same time
			for (var i = 0; i < laneCount; i++) 
			{
                // loop through the cells in the current lane
				for (var j = 0; j < cellsAcross; j++) 
				{
                    //draw the cell in the vertical lane
					grafx.drawCircle(
                        cellSize.x * (1 / 2 + laneOffset + i),
                        cellSize.y * (1 / 2 + j),
                        5
                    );
                    //draw the cell in the horizontal lane
					grafx.drawCircle(
                        cellSize.x * (1 / 2 + j),
                        cellSize.y * (1 / 2 + laneOffset + i),
                        5
                    );
				}
                //while we are here...fill out the spawn port data structures too
                spawnPorts.push(new game.spawnport(
                        cellSize.x / 2,
                        cellSize.y * (1 / 2 + laneOffset + i),
                        cellSize.x, 
                        0));
                spawnPorts.push(new game.spawnport(
                        game.width - cellSize.x / 2,
                        cellSize.y * (1 / 2 + laneOffset + i),
                        -cellSize.x,
                        0));
                spawnPorts.push(new game.spawnport(
                        cellSize.x * (1 / 2 + laneOffset + i),
                        cellSize.y / 2,
                        0,
                        cellSize.y));
                spawnPorts.push(new game.spawnport(
                        cellSize.x * (1 / 2 + laneOffset + i),
                        game.height - cellSize.y / 2,
                        0,
                        -cellSize.y));
 			}
			
			grafx.addTo(game.scene.stage);

			player = new game.swashbuckler(game.width / 2, game.height / 2);			
			
			// THIS IS THE GAME LOOP
			this.addTimer(framesPerSecond, function() {
				
                portIndex = Math.floor(Math.random(0, laneCount * 4));
                spawnPorts[portIndex].spawn();
             
                	
                	
                	
			}, true);
			
		},  
		
		 keydown: function(key) {
		        if (key === 'SPACE') {
		        	bullets.unshift( new game.bullet(player.sprite.position.x, player.sprite.position.y, 0));
		        	
		        }
		        if (key==='P')
		        	window.alert("Length"+bullets.length);
		    },
	});

});
