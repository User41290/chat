var Text = require("./text.js");
var User = require("./user.js");
var Conversation = require("./conversation.js");
var solution = require("./solution.js")();

/*var sentences = "Hi. I forgot my username. How can I login?";
var username = "Ali";
var user_id = "abc";
var conv_id = 1;

var conv = new Conversation(1);

if(!conv.get_user(user_id)){
	var usr = new User(user_id, username);
	conv.add_user(usr);
}

console.log(conv);
console.log();


var txt = new Text(sentences);

var pre_txt = txt.tokenization();
var result = txt.classify(pre_txt);
console.log("----- result -----");
console.log(result);
*/
console.log(solution);
solution.call_host_api("0e83088027d4c42c8e9934388480c996", "demo04");