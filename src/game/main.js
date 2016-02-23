/*
Copyright © 2016 Jon Allen <ylixir@gmail.com>
Copyright © 2016 erik4999 <erik4999@users.noreply.github.com>
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See the COPYING file for more details.
 */
chanceToDie= 0.5;
liveCheckTime= 500; //in milliseconds?
    
game.module('game.main').body(function() {

    
    game.addAsset('panda.png');
    game.createClass('Swashbuckler',{
        speed:100,
        init:function(){
			this.sprite = new game.Sprite('panda.png')
			this.sprite.addTo(game.scene.stage)
            this.sprite.position = new game.Vector(game.width/2,game.height/2)
        },
        update:function(){
            if(game.keyboard.down('UP')||game.keyboard.down('E')){
                this.sprite.position.y -= this.speed*game.system.delta
            }
            if(game.keyboard.down('DOWN')||game.keyboard.down('D')){
                this.sprite.position.y += this.speed*game.system.delta
            }
            if(game.keyboard.down('LEFT')||game.keyboard.down('S')){
                this.sprite.position.x -= this.speed*game.system.delta
            }
            if(game.keyboard.down('RIGHT')||game.keyboard.down('F')){
                this.sprite.position.x += this.speed*game.system.delta
            }
        }
    })
	game.createClass('ScurvyDog', {

		bearing : null,
 		init : function(x,y,vs,hs) {
			this.sprite = new game.Sprite('panda.png')
			this.sprite.addTo(game.scene.stage)
            this.sprite.position = new game.Vector(x,y)
            this.bearing = new game.Vector(vs,hs)
            this.sprite.addTo(game.scene.stage)
            
            this.body = new game.Body()
            this.body.collisionGroup = 1
            this.body.collideAgainst.push(0)
            this.body.position.set(x,y)
            this.body.collide = this.collide.bind(this)
            var shape = new game.Rectangle(this.sprite.width,this.sprite.height)
            this.body.addShape(shape)
            this.body.addTo(game.scene.world)
            

            game.scene.addTimer(liveCheckTime,this.remove.bind(this))
		},
        remove: function(){
            if(Math.random(0,1)<chanceToDie) {
                this.sprite.remove()
                this.body.remove()
                game.scene.removeObject(this)
            }
            else
                game.scene.addTimer(liveCheckTime,this.remove.bind(this))
        },
        collide:function() {
            this.bearing.x*=-1
            this.bearing.y*=-1
        },
       

		update : function() {
            this.sprite.position.multiplyAdd(this.bearing,game.system.delta)
            this.body.position.copy(this.sprite.position)
		}
	});
	game.createScene('Main', {
		backgroundColor : '#666',

		init : function() {
            console.log('Press ctl-shift-i in chrome to see this');
            
            this.world = new game.World()
            this.world.gravity.set(0,0)
            var walls = new game.Body()
            walls.position.set(game.width/2,game.height/2)
            walls.static = true;
            walls.addShape(new game.Rectangle(100,game.height,game.width,0))
            walls.addShape(new game.Rectangle(game.width,100,0,game.height))
            walls.addShape(new game.Rectangle(100,game.height,0,0))
            walls.addShape(new game.Rectangle(game.width,100,0,0))
            walls.addTo(this.world)
            
            var player = new game.Swashbuckler()
            this.addTimer(liveCheckTime,
              function(){
                    if(Math.random(0,1)<1-chanceToDie)
                        var pirate = new game.ScurvyDog(
                            game.width.random(),
                            game.height.random(),
                            Math.random(-100,100),
                            Math.random(-100,100))
              },true);

		}
	});

});
