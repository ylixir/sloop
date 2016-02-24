/*
Copyright © 2016 Jon Allen <ylixir@gmail.com>
Copyright © 2016 erik4999 <erik4999@users.noreply.github.com>
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See the COPYING file for more details.
 */

game.module('game.main').body(
		function() {

            chanceToDie = 0.5;
            liveCheckTime = 1500; // in milliseconds?
            
			game.addAsset('panda.png');
            
			game.createClass('Swashbuckler',
					{
						speed : 100,
						init : function() {
							this.sprite = new game.Sprite('panda.png')
							this.sprite.addTo(game.scene.stage)
							this.sprite.position = new game.Vector(
									game.width / 2, game.height / 2)
						},
						update : function() {
							if (game.keyboard.down('UP')
									|| game.keyboard.down('E')) {
								this.sprite.position.y -= this.speed
										* game.system.delta
							}
							if (game.keyboard.down('DOWN')
									|| game.keyboard.down('D')) {
								this.sprite.position.y += this.speed
										* game.system.delta
							}
							if (game.keyboard.down('LEFT')
									|| game.keyboard.down('S')) {
								this.sprite.position.x -= this.speed
										* game.system.delta
							}
							if (game.keyboard.down('RIGHT')
									|| game.keyboard.down('F')) {
								this.sprite.position.x += this.speed
										* game.system.delta
							}
						},
						remove : function() {
							this.sprite.remove();
						},
				poop : function() {
					var grap = new game.Graphics();
					grap.fillColor = '#7A5230';
					grap.drawCircle(this.sprite.position.x,
							this.sprite.position.y, 10);
					grap.addTo(game.scene.stage);
                }
					});
			game.createClass('ScurvyDog', {
				bearing : null,
				init : function(x, y, vs, hs) {
					this.sprite = new game.Sprite('panda.png')
					this.sprite.addTo(game.scene.stage)
					this.sprite.position = new game.Vector(x, y)
					this.bearing = new game.Vector(vs, hs)
					this.sprite.addTo(game.scene.stage)

					this.body = new game.Body()
					this.body.collisionGroup = 1
					this.body.collideAgainst.push(0)
					this.body.position.set(x, y)
					this.body.collide = this.collide.bind(this)
					var shape = new game.Rectangle(this.sprite.width,
							this.sprite.height)
					this.body.addShape(shape)
					this.body.addTo(game.scene.world)

					game.scene.addTimer(liveCheckTime, this.remove.bind(this))
				},
				remove : function() {
					if (Math.random(0, 1) < chanceToDie) {
						this.sprite.remove()
						this.body.remove()
						game.scene.removeObject(this)
					}
                    else{
                        this.poop()
						game.scene.addTimer(liveCheckTime,
                                            this.remove.bind(this))
                    }
                        
				},
				collide : function() {
                    console.log("crash")
                    this.bearing.multiply(-1)
				},

				update : function() {
					this.sprite.position.multiplyAdd(this.bearing,
							game.system.delta)
					this.body.position.copy(this.sprite.position)
				},
				poop : function() {
					var grap = new game.Graphics();
					grap.fillColor = '#7A5230';
					grap.drawCircle(this.sprite.position.x,
							this.sprite.position.y, 10);
					grap.addTo(game.scene.stage);
				}
			});
			game.createScene('Main', {
				backgroundColor : '#B3DBE9',
				init : function() {
					console.log('Press ctl-shift-i in chrome to see this');

                    var cellSize = new game.Vector(game.width/18,game.height/18)
                    
					this.world = new game.World()
					this.world.gravity.set(0, 0)
					var wall = new game.Body()
					wall.position.set(game.width / 2, game.height / 2)
					wall.static = true;
					wall.addShape(new game.Rectangle(
                        cellSize.x*4,
                        cellSize.y*4,
                        cellSize.x*7,
                        cellSize.y*7))
					wall.addTo(this.world)
					// ///////////////////////////////////////////////////
					// I KNOW THE MATHEMATICIAN CAN FIGURE OUT A BETTER WAY TO
					// DO THIS! DRAW THE GRID
                    // sigh...fracking comp sci people.
                    //      done with love,
                    //      ylixir
                    // p.s. if you ever need help figuring out the difference
                    //      between a star and a grid, let me know.
					// /////////////////////////////////////////////////////////
					var grap = new game.Graphics();
                    //the home base
					grap.fillColor = '#666';
                    grap.drawRect(
                        wall.shape.x,
                        wall.shape.y,
                        wall.shape.width,
                        wall.shape.height)
                    //the grid
					grap.fillColor = '#000000';
                    for(var i=0;i<4;i++){ 
                        for(var j=0;j<18;j++){
                            grap.drawCircle(
                                cellSize.x/2+cellSize.x*(7+i),
                                cellSize.y/2+cellSize.y*j,
                                5)
                            grap.drawCircle(
                                cellSize.x/2+cellSize.x*j,
                                cellSize.y/2+cellSize.y*(7+i),
                                5)
                        }
                    }
					grap.addTo(game.scene.stage);
                    

					this.player = new game.Swashbuckler()
					this.addTimer(liveCheckTime, function() {
						if (Math.random(0, 1) < 1 - chanceToDie) {
                            //Math.random gives a value in the interval: [min,max)
                            var position
                            //get the axis
                            if(Math.floor(Math.random(0,2)))
                                position = new game.Vector(1,0)
                            else
                                position = new game.Vector(0,1)
                            var bearing = new game.Vector(position.y,position.x)
                            bearing.multiply(2*Math.floor(Math.random(0,2))-1)
                            //get the lane
                            position.multiply(Math.floor(Math.random(1,5)))
                            
                            //do math, make everything like it should be
                            position.multiply(cellSize.x,cellSize.y)
                            if(position.x) {
                                position.y = -(bearing.y-1)/2*game.height
                                position.x += cellSize.x*6
                            }
                            else {
                                position.x = -(bearing.x-1)/2*game.width
                                position.y += cellSize.y*6
                            }
                            bearing.multiply(100)
                                
							var pirate = new game.ScurvyDog(
                                position.x,
                                position.y,
                                bearing.x,
                                bearing.y)
						}

					}, true);

				},
				keydown : function(key) {
					if (key == 'SPACE') {
						this.player.poop();
					}
				}
			});

		});
