var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var _ = require('underscore');


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


server.listen(8099);


io.on('connection', function(socket){
	console.log("A user has connected!");

	socket.conn.on('close', function(){
		console.log("======== SOCKET CONN CLOSE =========");
		console.log("closed's socket id=="+socket.id);
	});

	socket.on('disconnect', function (){
		console.log('a user is disconnected!');
		console.log("disconnect socket id =="+socket.id);
	});
	
	socket.on('test', function(data){
		console.log('test function');
		console.log('from '+data);
	});

});
