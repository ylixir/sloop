/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab : */ 
/* global game */
/* jshint asi: true */
/* Copyright © 2016 Jon Allen <ylixir@gmail.com>
 * Copyright © 2016 erik4999 <erik4999@users.noreply.github.com>
 * This work is free. You can redistribute it and/or modify it under the
 * terms of the Do What The Fuck You Want To Public License, Version 2,
 * as published by Sam Hocevar. See the COPYING file for more details.
 */
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