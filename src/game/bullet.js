/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab : */ 
/* global game */
/* jshint asi: true */
/*
 *  Copyright © 2016 Jon Allen <ylixir@gmail.com>
 *  Copyright © 2016 erik4999 <erik4999@users.noreply.github.com>
 *  This work is free. You can redistribute it and/or modify it under the
 *  terms of the Do What The Fuck You Want To Public License, Version 2,
 *  as published by Sam Hocevar. See the COPYING file for more details.
 */
game.module('game.main.bullet').body(function() {
	game.createClass('bullet', 'PhysicsSprite', {
		texture: 'bullet.png',
		xSpeed:8,
		ySpeed:8,
		init: function(x, y, dir){

            this.super('bullet.png',10,10);
			this.position.set(x, y);
			this.body.collisionGroup = 1;
			this.body.collideAgainst = 0;
			//this.body.collideAgainst.push(0);
			//this.body.collide = this.collide.bind(this);
			this.addTo(game.scene.stage);
			//this.xSpeed *= Math.cos(dir);
			//this.ySpeed *= Math.sin(dir);
			//this.sprite = new game.Sprite('bullet.png');
			//this.sprite.anchor.x = 0.5;
			//this.sprite.anchor.y = 0.5;
			//this.sprite.position.x = x;
			//this.sprite.position.y = y;
			//this.sprite.addTo(game.scene.stage);
		},
		update: function(){
		
			if (this.position.x > game.width ||
					this.position.y > game.height)
					//this.sprite.position.x >= game.system.width ||
					//this.sprite.position.y >= game.system.height)
			{
				//this.position.x=10;
				//this.position.y=10;
			}
			else
				{
				this.position.x += this.xSpeed;
				this.position.y += this.ySpeed;
				}
		
		},
		remove : function() {
			this.remove();
		}
	});
});
	