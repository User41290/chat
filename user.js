var _ = require("underscore");

var EventEmitter = require('events').EventEmitter;
EventEmitter.defaultMaxListeners = 0;
var util = require('util');

function User(id, name) {
	this.user_id = id;
	this.name = name;
}


User.prototype.setPlayerInfo = function(){
	
}


util.inherits(User, EventEmitter);

module.exports = User;