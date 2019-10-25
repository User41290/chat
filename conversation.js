var _ = require("underscore");

var EventEmitter = require('events').EventEmitter;
EventEmitter.defaultMaxListeners = 0;
var util = require('util');


function Conversation(id) {
	this.id = id;
	this.user_obj = null;
	this.question = [];
	this.server_response = [];
	this.is_q_account_related = null;
	this.expect_answer = false;
	this.question_category = "";
	this.answer_field = "";
	this.operator = "0e83088027d4c42c8e9934388480c996";
	this.execute_code = "";
}


Conversation.prototype.add_user = function(user){
	if(this.user_obj == null){
		this.user_obj = user;
	}
	else{
		console.log("user has been added");
		return null;
	}
}


Conversation.prototype.get_user = function(user_id){
	if(this.user_obj == null){
		console.log("user is not existed.");
		return null;
	}
	else{
		return this.user_obj;
	}
}


Conversation.prototype.add_question = function(ques_str){
	this.question.push(ques_str);
}


Conversation.prototype.add_response = function(reply_str){
	this.server_response.push(reply_str);
}


Conversation.prototype.set_question_type = function(type){
	this.is_q_account_related = type;
}

util.inherits(Conversation, EventEmitter);

module.exports = Conversation;