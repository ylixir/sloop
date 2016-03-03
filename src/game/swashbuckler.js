game.module('game.main.swashbuckler').body(function() {
	game.createClass('swashbuckler', {
		speed : 100,
		init : function() {
			this.sprite = new game.Sprite('panda.png')
			// it seems strange to add this class to game.scene.stage from its definition
			this.sprite.addTo(game.scene.stage)
			this.sprite.position = new game.Vector(game.width / 2, game.height / 2)
		},
		update : function() {
			if (game.keyboard.down('UP') || game.keyboard.down('E')) {
				this.sprite.position.y -= this.speed * game.system.delta
			}
			if (game.keyboard.down('DOWN') || game.keyboard.down('D')) {
				this.sprite.position.y += this.speed * game.system.delta
			}
			if (game.keyboard.down('LEFT') || game.keyboard.down('S')) {
				this.sprite.position.x -= this.speed * game.system.delta
			}
			if (game.keyboard.down('RIGHT') || game.keyboard.down('F')) {
				this.sprite.position.x += this.speed * game.system.delta
			}
		},
		remove : function() {
			this.sprite.remove();
		},
		poop : function() {
			var grap = new game.Graphics();
			grap.fillColor = '#7A5230';
			grap.drawCircle(this.sprite.position.x, this.sprite.position.y, 10);
			grap.addTo(game.scene.stage);
		}
	});
});