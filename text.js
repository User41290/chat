var _ = require("underscore");
var dict = require("./dictionary.json");
var classifier = require("./classifier.json");
var solution = require("./solution.js")();

function Text(text_str, conversation) {
	this.tokenized_arr = [];
	this.original_text = text_str;
	this.conversation = conversation;
	
}

Text.prototype.process = function(){
	var that = this;
	
	return new Promise(function(success, reject){
		/*	// When answering it is account or integration
		var is_acc_others = null;//that.check_is_account_or_integration();
		if(is_acc_others != null){
			that.question_category = is_acc_others;
			var res = that.reply(is_acc_others);
		} */
		
		if(that.conversation.execute_code != ""){
			that.db_interaction(that.conversation.execute_code, that.original_text).then(function(reply){
				success(reply);
			}, function(err){
				console.log(err);
			});
		}
		else if(that.conversation.expect_answer == true){
			var res = that.process_client_reply(that.original_text);
			success(res);
		} 
		// When question on it
		else{
			var pre_txt = that.tokenization();
			var result = that.classify(pre_txt);
			that.conversation.question_category = result;
			var res = that.reply(result);
			success(res);
		}
	})
	

	
	
}


Text.prototype.tokenization = function(){
	var that = this;
	
	// 1. Step 1 - to lower case
	var lower_case_text = that.original_text.toLowerCase();
	
	// 2. Step 2 - remove all special characters
	var after_sp_text = that.replace_sp_char(lower_case_text);
	
	// 3. Step 3 - Chunk into word array
	that.tokenized_arr = after_sp_text.split(" ");
	console.log("---- tokenization arr -----");
	console.log(that.tokenized_arr);
	
	// 4. Step 4 - Remove common word
	var after_remove_common = that.remove_common_word();
	return after_remove_common;
}


Text.prototype.check_is_account_or_integration = function(){
	if(this.original_text.toLowerCase() == "account"){
		this.conversation.is_q_account_related = true;
		return "account";
	}
	else if(this.original_text.toLowerCase() == "others"){
		this.conversation.is_q_account_related = false;
		return "others";
	}
	else{
		return null;
	}
}


Text.prototype.replace_sp_char = function(txt){
	var lala = txt.replace(/[,.&\/\\#,+()$~%.'":*?<>{}]/g, '');
	console.log(lala);
	return lala;
}


Text.prototype.remove_common_word = function(){
	var that = this;
	var common_arr = dict['common'];
	var temp = [];
	
	for(var i = 0 ; i < that.tokenized_arr.length; i++){
		if(common_arr.indexOf(that.tokenized_arr[i]) == -1){
			temp.push(that.tokenized_arr[i]);
		}
	}
	
	that.tokenized_arr = temp;
	
	console.log("after remove common word");
	console.log(temp);
	return temp;
}


Text.prototype.classify = function(txt){
	var that = this;
	var keys = Object.keys(classifier);
	var score_arr = [];
	var max_score = 0;
	var max_key = "";
	
	for(var h = 0; h < keys.length; h++){
		var key = keys[h];
		score_arr[h] = 0;
		for(var i = 0 ; i < txt.length; i++){
			if(classifier[key].indexOf(txt[i]) > -1){
				score_arr[h] ++;
			}
		}
		
		if(score_arr[h] > max_score){
			max_score = score_arr[h];
			max_key = key;
		}
	}
	
	return max_key;
	
}


Text.prototype.reply = function(question_category){
	var that = this;
	
	var bot_response = "";
	
	if(question_category == "greeting"){
		bot_response += "Hi there. How can I help you?";
	}else{
	/*	if(that.conversation.is_q_account_related == null){
			bot_response = "Is your question related to Account or Others? Please type [Account] or [Others]";
			return bot_response;
		}*/
		
		if(question_category == "account"){		
			bot_response += "Can I have your Host ID please?";
			
		}
		else if(question_category == "others"){		
			bot_response += "Can you describe your question in details?";
		}
		else if(question_category == "login"){		
			bot_response += "Can I have your host ID please?"
		}
		else if(question_category == "start-game"){		
			bot_response += "What's the error message did you get during start game? Please choose between these two: [Invalid Host Credential] or [Others]";
			that.conversation.expect_answer = true;
		}
		else if(question_category == "configure_return_url"){
			bot_response = "Yes sure. Please hold on a second.";
			that.conversation.execute_code = "configure-return-url";
			that.process();
		}
		else{
			bot_response = "I don't understand your question. Can you describe in details please?";
		}
	}
	
	return bot_response;
	
}


Text.prototype.process_client_reply = function(answer){
	var that = this;
	var bot_reply = "";
	if(that.conversation.question_category == "start-game"){
		var temp = answer.toLowerCase();
		if(temp == "invalid host credential"){
			bot_reply = "Kindly send us an access token to try.";
			that.conversation.execute_code = "call_host_api";
		}
		else if(temp == "others"){
			bot_reply = "Please describe and submit your problem here. Our team will assist on this matter as soon as possible.";
			that.conversation.execute_code = "email_support";
		}
		else{
			bot_reply = "What's the error message did you get during start game? Please choose between these two: [Invalid Host Credential] or [Others]";
		}
	}
	
	return bot_reply;
}



Text.prototype.db_interaction = async function(step, params = null){
	var that = this;
	console.log(step +"<------------");
	console.log(params +"<------------");
	
	if(step == 'call_host_api'){
		var status = await solution.call_host_api(that.conversation.operator, params);
		that.conversation.expect_answer = false;
		that.conversation.execute_code = "";
		return "The auth result is [" + status+"]";
	}
	else if(step == 'email_support'){
		await solution.email_support(that.conversation.question_category, params);
		that.conversation.expect_answer = false;
		that.conversation.execute_code = "";
		return "Your ticket has been submitted to our support team. Please wait patiently for the solution. Thank you.";
	}
	else if(step == 'configure_return_url'){
		await solution.configure_return_url();
		that.conversation.expect_answer = false;
		that.conversation.execute_code = "";
		return "Your ticket has been submitted to our support team. Please wait patiently for the solution. Thank you.";
	}
	
	
	
}



module.exports = Text;