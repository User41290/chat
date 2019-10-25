var app = require('express')();
var express = require('express');

var server = require('http').Server(app);
var io = require('socket.io')(server);
var _ = require('underscore');
const bodyParser = require("body-parser");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
}));
//app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


server.listen(9015);

var total_users = 0;
io.on('connection', function(socket){
	console.log("A user has connected!");
	

	socket.on('disconnect', function (){
		console.log('a user is disconnected!');
		console.log("disconnect socket id =="+socket.id);
	});
	
	
	
	
	
	
});
