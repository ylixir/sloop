/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab : */ 
/* global game */
/* jshint asi: true */
/* Copyright © 2016 Jon Allen <ylixir@gmail.com>
 * Copyright © 2016 erik4999 <erik4999@users.noreply.github.com>
 * This work is free. You can redistribute it and/or modify it under the
 * terms of the Do What The Fuck You Want To Public License, Version 2,
 * as published by Sam Hocevar. See the COPYING file for more details.
 */

game.module('game.main.scurvydog').body(function() {
	game.createClass('scurvydog', 'PhysicsSprite', {
        texture: 'panda.png',
		init : function(x, y) {	
			
            this.super('panda.png',48,48);
			this.position.set(x, y);
			this.body.collisionGroup = 1;
			this.body.collideAgainst.push(0);
			this.body.collide = this.collide.bind(this);
			this.addTo(game.scene.stage);
		},
        /*
		remove : function() {
			if (Math.random(0, 1) < chanceToDie) {
				this.remove();
			} else {
				this.poop();
				game.scene.addTimer(liveCheckTime, this.remove.bind(this))
			}

		},*/
		collide : function() {
		window.alert("Hi there collidr");
		},
		remove : function() {
			this.remove();
		}
        /*
		update : function() {
			this.position.multiplyAdd(this.bearing, game.system.delta);
		},*/
	});
});