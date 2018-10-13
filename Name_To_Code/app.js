const readline = require('readline');
const request = require('request');
// acquire Request.......................

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var key = require('../keys/keys');

rl.question('Enter the Station Name ', (answer1) => {
	var encodedName = encodeURIComponent(answer1);
request({
	url :`https://api.railwayapi.com/v2/name-to-code/station/${encodedName}/apikey/${key.myKey}/`,
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
		if(!body.stations)
		{
			console.log("Plz double check the Spelling of Station");
		}
		else{
		for( i = 0; i<body.stations.length; i++){
			if(body.stations[i].name == answer1.toUpperCase())
			{
				console.log(`Station Name               ${body.stations[i].name}`);
				console.log(`Station Code               ${body.stations[i].code}`);
			}
		}
	}}
});
rl.close();
});