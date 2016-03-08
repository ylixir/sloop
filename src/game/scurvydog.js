/* global game */
/* jshint asi: true */

game.module('game.main.scurvydog').body(function() {
	game.createClass('scurvydog', {
		bearing : null,
		init : function(x, y, vs, hs) {
			this.sprite = new game.Sprite('panda.png');
			this.sprite.addTo(game.scene.stage);
			this.sprite.position = new game.Vector(x, y);
			this.bearing = new game.Vector(vs, hs);
			// it seems strange to add this class to game.scene.stage from its definition
			this.sprite.addTo(game.scene.stage);

			this.body = new game.Body();
			this.body.collisionGroup = 1;
			this.body.collideAgainst.push(0);
			this.body.position.set(x, y);
			this.body.collide = this.collide.bind(this);
			var shape = new game.Rectangle(this.sprite.width, this.sprite.height);
			this.body.addShape(shape);
			this.body.addTo(game.scene.world);

			game.scene.addTimer(liveCheckTime, this.remove.bind(this))
		},
		remove : function() {
			if (Math.random(0, 1) < chanceToDie) {
				this.sprite.remove();
				this.body.remove();
				game.scene.removeObject(this);
			} else {
				this.poop();
				game.scene.addTimer(liveCheckTime, this.remove.bind(this))
			}

		},
		collide : function() {
			console.log("crash");
			this.bearing.multiply(-1);
		},

		update : function() {
			this.sprite.position.multiplyAdd(this.bearing, game.system.delta);
			this.body.position.copy(this.sprite.position);
		},
		poop : function() {
			var grap = new game.Graphics();
			grap.fillColor = '#7A5230';
			grap.drawCircle(this.sprite.position.x, this.sprite.position.y, 10);
			grap.addTo(game.scene.stage);
		}
	});
});