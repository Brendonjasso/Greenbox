var appRouter = function(app){
	
	var twilioAccountSid = 'AC3289c6b81281b3e9f2177c345bf88b76'; // Your Account SID from www.twilio.com/console
	var twilioAuthToken = '35fb0425a46ac506e06cb964309fe2e5';   // Your Auth Token from www.twilio.com/console
	var twilio = require('twilio');
	var twilioClient = new twilio(twilioAccountSid, twilioAuthToken);

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
 	function CheckCredentials(username, password){
 		loginQuery = "SELECT * FROM basics WHERE username = '" + username + "' AND password = '" + password + "'"; 
			
			//Run Login QUery
			con.query(loginQuery, function(error, response){
				if(error) throw error;
				if(response.length == 1){
					console.log(response);
	}
	//Listen for Login attempt (POST ONLY)
	app.get("/login", function (request, response){
		
		//Log attempt
		console.log("Access to /login requested. METHOD: POST");
		
		//Handle Missing Credentials
		if(!request.query.username || !request.query.password){
			response.send({
				"ErrorCode" : "1",
				"ErrorDescription" : "Error: Missing Credentials!"
			});
		}else {
			var username = request.query.username;
			var password = request.query.password;

			//Check if 
			if(!CheckCredentials(username, password)){
				response.send({
					"ErrorCode" : "2",
					"ErrorDescription" : "Error: Credentials are bad!"
				});
			}else {
				response.send("Correct Credentials!");

				//twilioClient.messages.create({
   				//body: 'Welcome to Greenbox! Your Account Details are as follows:',
    			//to: '+15055779730',  // Text this number
    			//from: '+18339883761' // From a valid Twilio number
			//}).then((message) => console.log(message.sid));


			}
		}
	});
}



// 	//Handle Requests to ANY URL
// 	app.post("/download", function(req, datares){
// 		console.log("GET Request Received!");
// 		//Check if credentials were provided
// 		if(!req.query.ORGID || !req.query.APIKEY){
// 			datares.send("Insufficient Credentials Provided!");
// 		}else{
// 			//Credentials provided
// 			var suppliedORGID = req.query.ORGID;
//      		var suppliedAPIKEY = req.query.APIKEY;
//      		if (!req.query.TABLE) {
//      			var table = "incidentcase";
//      		}else {
//      			var table = req.query.TABLE;
//      			switch(table){
//      				case "Offender":
//      					var table = "offender";
//      					break;
//      				case "Offense":
//      					var table = "offense";
//      					break;
//      				case "IncidentCase":
//      					var table = "incidentcase";
//      					break;
//      				default:
//      					var table = "incidentcase"
//      			}
//      		}
//      		LogRequest(suppliedORGID, table);
//      		//response.send(suppliedORGID + suppliedAPIKEY);
// 			loginQuery = "SELECT user_pass FROM wp_users WHERE user_login = '" + suppliedORGID + "'"; 
			
// 			//Run Login QUery
// 			con.query(loginQuery, function(error, response){
// 				if(error) throw error;
// 				if(response.length == 1){
// 					serverpass = response[0]['user_pass'];
// 					if(hasher.CheckPassword(suppliedAPIKEY, serverpass)){
// 						SendData(datares, table);
// 					}else {
// 						return datares.send("Bad Credentials");
// 					}
// 				}else {
// 					return datares.send("Insufficient Data Provided!");
// 				}
// 			});
// 		}
// 	});
// 	app.get("/download", function(req, datares){
// 		console.log("GET Request Received!");
// 		//Check if credentials were provided
// 		if(!req.query.ORGID || !req.query.APIKEY){
// 			datares.send("Insufficient Credentials Provided!");
// 		}else{
// 			//Credentials provided
// 			var suppliedORGID = req.query.ORGID;
//      		var suppliedAPIKEY = req.query.APIKEY;
//      		if (!req.query.TABLE) {
//      			var table = "incidentcase";
//      		}else {
//      			var table = req.query.TABLE;
//      			switch(table){
//      				case "Offender":
//      					var table = "offender";
//      					break;
//      				case "Offense":
//      					var table = "offense";
//      					break;
//      				case "IncidentCase":
//      					var table = "incidentcase";
//      					break;
//      				default:
//      					var table = "incidentcase"
//      			}
//      		}
//      		LogRequest(suppliedORGID, table);
//      		//response.send(suppliedORGID + suppliedAPIKEY);
// 			loginQuery = "SELECT user_pass FROM wp_users WHERE user_login = '" + suppliedORGID + "'"; 
			
// 			//Run Login QUery
// 			con.query(loginQuery, function(error, response){
// 				if(error) throw error;
// 				if(response.length == 1){
// 					serverpass = response[0]['user_pass'];
// 					if(hasher.CheckPassword(suppliedAPIKEY, serverpass)){
// 						SendData(datares, table);
// 					}else {
// 						return datares.send("Bad Credentials");
// 					}
// 				}else {
// 					return datares.send("Insufficient Data Provided!");
// 				}
// 			});
// 		}
// 	});
// 	function SendData(datares, table){
// 		offenderQuery = "SELECT * FROM " + table;
// 		con.query(offenderQuery, function(error, response){
// 			if(error) throw error;
// 			datares.setHeader('Content-disposition', 'attachment; filename=' + table + '.dat');
// 			datares.setHeader('Content-type', 'text/plain');
// 			datares.charset = 'UTF-8';
// 			datares.send(response);
// 		});
// 	}
// 	function LogRequest(ORGID, Table){
// 		logQuery = "INSERT INTO `log` (`LogID`, `OrgID`, `Time`, `TableAccessed`) VALUES (NULL, '" + ORGID + "', NULL, '" + Table + "');";
// 		con.query(logQuery, function(error, response){
// 			console.log("Requests Logged!");
// 		});
// 	}
// }