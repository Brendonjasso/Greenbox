var appRouter = function(app){
	const mysql = require('mysql');
	var twilioAccountSid = 'AC3289c6b81281b3e9f2177c345bf88b76'; // Your Account SID from www.twilio.com/console
	var twilioAuthToken = '35fb0425a46ac506e06cb964309fe2e5';   // Your Auth Token from www.twilio.com/console
	var twilio = require('twilio');
	var twilioClient = new twilio(twilioAccountSid, twilioAuthToken);

	var nodemailer = require('nodemailer');

	var transporter = nodemailer.createTransport({
  	service: 'gmail',
  	auth: {
    	user: 'notswabisan@gmail.com',
    	pass: 'thefreshprince'
  	}
	});


	queryresult = "";

	//Credentials for MySQL
	var con = mysql.createConnection({
	  	host: "localhost",
	  	user: "web",
		password: "greenbox",
		database : "greenbox"
	});
	con.connect(function(error){
		if(error) throw error;
	});
	app.post("/test", function(request, response){
		response.send(request.query);
	});
	app.post("/login", function(request, response){
		console.log("Access to /login requested. METHOD: POST");
		console.log(request.body);

		 if(!request.body.username || !request.body.password){
		 	response.send(JSON.stringify({
		 		"StatusCode" : "1",
		 		"StatusMessage" : "Error: Missing Credentials!"
		 	}));
		 }else {
		 	var username = request.body.username;
		 	var password = request.body.password;

		 	var remoteIP = request.connection.remoteAddress;


		 	console.log("Credentials: Username: " + username + " Password: " + password);
		 	loginQuery = "SELECT COUNT(*) FROM basics WHERE username = '" + username + "' AND password = '" + password + "'"; 
		 	con.query(loginQuery, function(error, queryres){
		 		if(!queryres[0]['COUNT(*)'] == 1){
		 			//Login Failure!
		 			response.send(JSON.stringify({
		 				"StatusCode" : "2",
		 				"StatusMessage" : "Error: Bad Credentials!"
		 			}));
		 		}else {
					
		 			const crypto = require('crypto');
		 			var token = crypto.randomBytes(64).toString('hex');
		 			//Log Into DB
		 			recordLoginQuery = "UPDATE basics SET token = '" + token + "', loginIP = '" + remoteIP + "' WHERE username = '" + username + "'";
		 			console.log(recordLoginQuery);
		 			con.query(recordLoginQuery, function(error, queryres){
		 				console.log("Login Successful!");
		 			});
 			response.send(JSON.stringify({
		 				"StatusCode" : "0",
		 				"StatusMessage" : "Success! Login Success!",
		 				"Token" : token
		 			}));
		 		}
		 	});
		}//END CHECK IF CREDENTIALS PRESENT
	});//END GET FOR /LOGIN
	app.post("/create", function(request, response){
		console.log(request.body);
		if(!request.body.firstname || !request.body.lastname || !request.body.birthdate || !request.body.email || !request.body.phone || !request.body.username || !request.body.password){
			response.send(JSON.stringify({
				"StatusCode" : "4",
				"StatusMessage" : "Error: Insufficent Information Provided!"
			}));
		}else {
			if(request.body.firstname == "" || request.body.lastname == "" || request.body.birthdate == "" || request.body.email  == "" || request.body.phone == "" || request.body.username == "" || request.body.password == ""){
				response.send(JSON.stringify({
					"StatusCode" : "5",
					"StatusMessage" : "Error: Information partly empty!"
				}));
			}else{
				createusername = request.body.username;
				createfirstname = request.body.firstname;
				createlastname = request.body.lastname;
				createbirthday = request.body.birthdate;
				createpassword = request.body.password;
				createemail = request.body.email;
				createphone = request.body.phone;
				createprofileURL = "";
				createpermitURL = "";
				createjoined = "2001-01-01";
				createtoken = "";
				createloginIP = "";

				//All good!
				accountCreationQuery = "INSERT INTO basics (`username`, `firstname`, `lastname`, `birthday`, `password`, `email`, `phone`, `profileURL`, `permitURL`, `joined`, `token`, `loginip`) VALUES ('" + createusername + "', '" + createfirstname + "', '" + createlastname + "', '" + createbirthday + "', '" + createpassword + "', '" + createemail + "', " + createphone + ", '" + createprofileURL + "', '" + createpermitURL + "', '" + createjoined + "', '" + createtoken + "', '" + createloginIP + "')"; 
				
				con.query(accountCreationQuery, function(error, queryres){
					if(error) throw error;
				});
				createPreferences = "INSERT INTO preferences (`username`, `sativas`, `indicas`, `hybrids`, `active`, `motivate`, `creative`, `anxiety`, `happy`) VALUES ('" + createusername + "', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)";
				con.query(createPreferences, function(error, response){
					if(error) throw error;
					console.log(response);
				});
				twilioClient.messages.create({
   				body: 'Welcome to Greenbox, ' + createfirstname + '!\n Your username is: ' + createusername,
   				to: '+1' + createphone,  // Text this number
   				from: '+18339883761' // From a valid Twilio number
				}).then((message) => console.log(message.sid));

				var mailOptions = {
  					from: 'Greenbox, Inc.',
  					to: createemail,
  					subject: 'Welcome to Greenbox!',
  					text: 'We\'re so happy you\'ve joined us at Greenbox. \n Please enjoy our sevices! :) '
				};
				transporter.sendMail(mailOptions, function(error, info){
  					if (error) {
   						 console.log(error);
  					} else {
    					console.log('Email sent: ' + info.response);
  					}
				});

				response.send(JSON.stringify({
					"StatusCode" : "-1",
					"StatusMessage" : "Success! Account Created Successfully!"
				}));
			}
		}



	});//END /CREATE
	app.post("/update-settings", function(request, response){
		return_data = request.body;
		sativas = return_data['strain-sativa'];
		indicas = return_data['strain-indica'];
		hybrids = return_data['strain-hybrid'];
		active = return_data['mood-active'];
		motivate = return_data['mood-motivate'];
		creative = return_data['mood-creativity'];
		anxiety = return_data['mood-anxiety'];
		happy = return_data['mood-happy'];

		//HARDCODED!!!
		//REMOVE!!!
		username = "cschild";
		usertoken = "34205eda293dc8b8954e6972e328628840cea24b14398bc069adec7355b29a515a694f4c53b935aabe1f0e39a5f52277bedd4c3ec8d8af4d0aa7d651552a30c0'";//return_data['token'];
		
		updatePreferenceQuery = "UPDATE preferences SET `sativas` = '" + sativas + "', `indicas` = '" + sativas + "', `hybrids` = '" + hybrids + "', `active` = '" + active + "', `motivate` = '" + motivate + "', `creative` = '" + creative + "', `anxiety` = '" + anxiety + "', `happy` = '" + happy + "' WHERE username = (SELECT username FROM basics WHERE token = '34205eda293dc8b8954e6972e328628840cea24b14398bc069adec7355b29a515a694f4c53b935aabe1f0e39a5f52277bedd4c3ec8d8af4d0aa7d651552a30c0')";
		console.log(updatePreferenceQuery);
		con.query(updatePreferenceQuery, function(error, queryres){
			if(error) throw error;
		});

		response.send("Success!");


	});//END /UPDATE SETTINGS



}//End APPROUTER
module.exports = appRouter;