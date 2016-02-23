/*
Copyright © 2016 Jon Allen <ylixir@gmail.com>
Copyright © 2016 erik4999 <erik4999@users.noreply.github.com>
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See the COPYING file for more details.
 */
game.module('game.main').body(function() {

	game.addAsset('panda.png');
	game.createClass('Player', {
		dogshit : 0,
		init : function() {
			this.sprite = new game.Sprite('panda.png');
			this.sprite.addTo(game.scene.stage);

		},

		update : function() {
			if (this.dogshit % 10 != 0) {
				this.sprite.position.x += 50 * game.system.delta;
				this.sprite.position.y += 100 * game.system.delta;

			} else {
				this.sprite.position.x += 50 * game.system.delta;
				this.sprite.position.y -= 500 * game.system.delta;

			}
			this.dogshit++;
		}
	});
	game.createScene('Main', {
		backgroundColor : '#666',

		init : function() {

			var player = new game.Player();
			this.addObject(player);
		}
	});

});
