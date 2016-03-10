/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab : */ 
/* global game */
/* jshint asi: true */

game.module('game.main.scurvydog').body(function() {
	game.createClass('scurvydog', 'PhysicsSprite', {
        texture: 'panda.png',
		bearing : null,
		init : function(x, y, vs, hs) {
            this.super();
			this.position.set(x,y);
			this.bearing = new game.Vector(vs, hs);
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
			this.bearing.multiply(-1);
		},

		update : function() {
			this.position.multiplyAdd(this.bearing, game.system.delta);
		},
		poop : function() {
			var grap = new game.Graphics();
			grap.fillColor = '#7A5230';
			grap.drawCircle(this.position.x, this.position.y, 10);
			grap.addTo(game.scene.stage);
		}
	});
});