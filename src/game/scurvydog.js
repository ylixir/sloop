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
            this.super();
			this.position.set(x,y);
			// it seems strange to add this class to game.scene.stage from its definition

			this.body.collisionGroup = 1;
			this.body.collideAgainst.push(0);
			this.body.collide = this.collide.bind(this);
			this.addTo(game.scene.stage);

			//game.scene.addTimer(liveCheckTime, this.remove.bind(this))
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
			console.log("crash");
		},
        /*
		update : function() {
			this.position.multiplyAdd(this.bearing, game.system.delta);
		},*/
		poop : function() {
			var grap = new game.Graphics();
			grap.fillColor = '#7A5230';
			grap.drawCircle(this.position.x, this.position.y, 10);
			grap.addTo(game.scene.stage);
		}
	});
});