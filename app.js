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


server.listen(8099);

var total_users = 0;
io.on('connection', function(socket){
	console.log("A user has connected!");
	
	socket.emit('has_connect', "OK");
	
	var name;
	
/*	socket.conn.on('close', function(){
		console.log("======== SOCKET CONN CLOSE =========");
		console.log("closed's socket id=="+socket.id);
	});

	socket.on('disconnect', function (){
		console.log('a user is disconnected!');
		console.log("disconnect socket id =="+socket.id);
	});
	
	socket.on('subscribe', function(data){
		console.log('subscribe');
		socket.emit('onSubscribe', data+", you have successfully subscribe to this NodeJS test Program.");
		io.emit('message', data+" have login.");
	}); */
	
	socket.on('subscribe', function(data){
		if(!data){
			socket.emit('onSubscribeDone', {status_code: 1004, message: "Invalid data format."});
			return;
		}
		name = data;
		console.log(data+' has subscribed to this program.');
		total_users ++;
		socket.emit('onSubscribeDone', {status_code: 0, message: ""});
		io.emit('onTotalUsers', total_users);
		
	});
	
	
	socket.on('broadcast', function(data){
		io.emit('onBroadcast', name+": "+data);
	});
	

	socket.on('disconnect', function (){
		if(name){
			io.emit('onDisconnect', name+" has quit from the program.");
		}
		console.log('a user is disconnected!');
		console.log("disconnect socket id =="+socket.id);
	});
	
});
