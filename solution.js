var model = require("./models");
var mandrill = require('node-mandrill')('eTnZWdMY1PQbISNM3LsaQQ');
var request = require('request');


function get_host(host_id){
	return new Promise(function(success, reject){
		model.host.findOne({where: {name: host_id, deleted_at: null}}).then(function(host){
			if(host){
				success(host);
			}
			else{
				reject("Host is not found.");
			}
		})
	})
}


function get_host_auth_url(host_ukey){
	return new Promise(function(success, reject){
		model.host_settings.findOne({where: {id: host_ukey, setting_key: "auth-url" , deleted_at: null}}).then(function(url){
			if(url){
				success(url.setting_value);
			}
			else{
				reject("No setting has been found.");
			}
		})
	})
}


async function get_auth_url (host_id, access_token){
	// grab db host ukey
	var host = await get_host(host_id);
	var url = await get_host_auth_url(host.id);
	var full_url = url+"?host_id="+host_id+"&access_token="+access_token;
	return full_url;
}

module.exports = function(){
	var module = {
		call_host_api: function(host_id, access_token){
			return new Promise(function(success, reject){
				get_auth_url(host_id, access_token).then(function(full_url){
					request(full_url, function (error, response, body) {
						console.log('error:', error); // Print the error if one occurred
						console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
						console.log('body:', body); // Print the HTML for the Google homepage.
						
						body = JSON.parse(body);
						console.log(body.status_code);
					  
						if(body.status_code == 0){
							success("success");
						}
						else{
							success(body.message);
						}
					});
				});
			});
			
		},
		email_support: function(subject, content){
			return new Promise(function(success, reject){
				mandrill('/messages/send', {
					message: {
						to: [{email: 'lee-hyde@hotmail.com'}],
						from_email: 'system@vcfgame.com',
						subject: subject,
						text: content,
					}
				}, function(error, response)
				{
					if (error) {
						console.log( JSON.stringify(error) );
						reject();
					}

					else{
						console.log(response);
						success();
					} 
				});
			});
		},
		configure_return_url: function(){
			success("uuuuuuuu");
		}
	}
	
	return module;
	
}

