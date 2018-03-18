var twilioAccountSid = 'AC3289c6b81281b3e9f2177c345bf88b76'; // Your Account SID from www.twilio.com/console
var twilioAuthToken = '35fb0425a46ac506e06cb964309fe2e5';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var twilioClient = new twilio(twilioAccountSid, twilioAuthToken);

queryresult = "";
twilioClient.messages.create({
   	body: 'Welcome to Greenbox! Your Account Details are as follows:',
   	to: '+15055779730',  // Text this number
   	from: '+18339883761' // From a valid Twilio number
}).then((message) => console.log(message.sid));