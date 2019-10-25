var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var io = require('socket.io-client');
var express = require('express');


describe('test socket connection', function() {
	it('client emit and receive message from server', function (done) {  
		// Set up client1 connection
		var client = io.connect("http://localhost:8099");

		// Set up event listener.  This is the actual test we're running
	
		client.on('has_connect', function(data){
			expect(data).to.equal("OK");
			client.disconnect();
			done();
		});	
	});
	
	
	it('client emit subscribe and receive message from server', function (done) {  
		// Set up client1 connection
		var client = io.connect("http://localhost:8099");

		// Set up event listener.  This is the actual test we're running
		client.emit('subscribe',null);
		
		client.on('onSubscribeDone', function(data){
			console.log(data);
			expect(data).to.include({status_code: 1004});
			client.disconnect();
			done();
		});	
	});
	
	
});

