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
game.module('game.main.spawnport').body(function() {
	game.createClass('spawnport', {
        speed:300,
		bearing : null,
        position:null,
        dogs:[],
		init : function(x, y, vs, hs) {
			this.position = new game.Vector(x, y);
			this.bearing = new game.Vector(vs, hs);
		},
        spawn : function() {
        	// push a dog to the beginning of the array
            this.dogs.unshift( new game.scurvydog(
                    this.position.x - this.bearing.x,
                    this.position.y - this.bearing.y));
            
            //shift the dogs with animation!
            for(var i = 0; i < this.dogs.length; i++){
                //this could probably use some optimization
                var tween = new game.Tween(this.dogs[i].position);
                var target = this.dogs[i].position.clone();
                target.add(this.bearing.x, this.bearing.y);
                tween.to(target,this.speed);
                tween.start();
            }
        }

	});
});