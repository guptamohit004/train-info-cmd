const readline = require('readline');
const request = require('request');
// acquire Request.......................

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var key = require('../keys/keys');
rl.question('Enter the Train Number ', (answer1) => {
	request({
	url :`https://api.railwayapi.com/v2/name-number/train/${answer1}/apikey/${key.myKey}/`,
	json:true,
	},(error,response,body) => {
	if(error)
	{
		console.log("Server error");
	}
	else if(body.response_code === 404||body.response_code === 405)
	{
		console.log("Invalid");
	}
	else if(body.response_code === 210)
	{
		console.log("Train have either completed the journey or the Date is of Future....");
	}
	else if(body.response_code === 500)
	{
		console.log("Invalid API key......");
	}
	else
	{
		console.log(`Train Number is                  ${body.train.number}`);
		console.log(`Train Name   is                  ${body.train.name}`);
		console.log('Available type of Classes are..:');
		for( i = 0; i<body.train.classes.length; i++){
			if(body.train.classes[i].available == "Y")
			{
				console.log(`                                  ${body.train.classes[i].name}`);
			}
		}
		console.log('Train runs on following Days..:');
		for( i = 0; i<body.train.days.length; i++){
			if(body.train.days[i].runs == "Y")
			{
				console.log(`                                  ${body.train.days[i].code}`);
			}
		}
	}
});
rl.close();
});