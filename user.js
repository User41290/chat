var _ = require("underscore");

var EventEmitter = require('events').EventEmitter;
EventEmitter.defaultMaxListeners = 0;
var util = require('util');

function User(id, name, conversation_id) {
	this.id = id;
	this.name = name;
	this.conversation_id = conversation_id;
}


User.prototype.setPlayerInfo = function(){
	
}


util.inherits(User, EventEmitter);

module.exports = User;