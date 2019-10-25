const restify = require('restify');
const botbuilder = require('botbuilder');
var Text = require("./text.js");
var User = require("./user.js");
var Conversation = require("./conversation.js");
var _ = require("underscore");
 
// Create bot adapter, which defines how the bot sends and receives messages.
var adapter = new botbuilder.BotFrameworkAdapter({
    appId: "3a6e9d53-5802-47e7-aa0f-66ccdde6ccbc",
    appPassword: "yZ2WYVx/DCmCiU?45tK8jywWobXjBt:/"
});
 
// Create HTTP server.
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 9088, function () {
    console.log(`\n${server.name} listening to ${server.url}`);
    console.log(`\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator`);
});
 
var server_conversation = {};
 
// Listen for incoming requests at /api/messages.
server.post('/api/messages', (req, res) => {
    // Use the adapter to process the incoming web request into a TurnContext object.
    adapter.processActivity(req, res, async (turnContext) => {
        // Do something with this incoming activity!
        if (turnContext.activity.type === 'message') {            
            // Get the user's text
		//	console.log(turnContext.activity);
		//	console.log("user id : "+turnContext.activity.from.id);
            const utterance = turnContext.activity.text;
			console.log(utterance);
			
			// Grab conversation id
			var conversation_id = turnContext.activity.conversation.id;
			// Grab user info
			var user_id = turnContext.activity.from.id;
			var username = turnContext.activity.from.name;
			
			
			if(!_.has(server_conversation, conversation_id)){
				server_conversation[conversation_id] = new Conversation(conversation_id);
			}
			
			if(!server_conversation[conversation_id].get_user(user_id)){
				var usr = new User(user_id, username, conversation_id);
				server_conversation[conversation_id].add_user(usr);
			}
			
			// add Question into the conversation object
			server_conversation[conversation_id].add_question(utterance);
			
            // send a reply
			var txt = new Text(utterance, server_conversation[conversation_id]);
			var res = await txt.process();
			
			server_conversation[conversation_id].add_response(res);
		//	console.log(server_conversation);
			
			await turnContext.sendActivity(`This is a Question regarding ${ txt.conversation.question_category }`);
			 
			 await turnContext.sendActivity(res);
		
        }
    });
});