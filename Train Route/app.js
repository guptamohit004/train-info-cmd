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
	url :`https://api.railwayapi.com/v2/route/train/${answer1}/apikey/${key.myKey}/`,
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
	else if(body.response_code === 500)
	{
		console.log("Invalid API key......");
	}
	else
	{
			var time = body.route[0].schdep;
		 	time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
			if (time.length > 1) { // If time format correct
    		time = time.slice (1);  // Remove full string match value
    		time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    		time[0] = +time[0] % 12 || 12; // Adjust hours
			console.log(`Train Name ${body.train.name}`);
			console.log(`Train No.  ${body.train.number}`);
			console.log(`Train Starts from ${body.route[0].station.name} (${body.route[0].station.code})`);
			console.log("Train Starts At ",time.join (''));
			console.log("-------------------------------------------------------------------------------------");
			}
		for(var i = 1;i<=body.route.length;i++)
		{
			var time = body.route[i].schdep;
		 	time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
			if (time.length > 1) { // If time format correct
    		time = time.slice (1);  // Remove full string match value
    		time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    		time[0] = +time[0] % 12 || 12; // Adjust hours
    		var time1 = body.route[i].scharr;
		 	time1 = time1.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
			if (time1.length > 1) { // If time format correct
    		time1= time1.slice (1);  // Remove full string match value
    		time1[5] = +time1[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    		time1[0] = +time1[0] % 12 || 12; // Adjust hou
			{
				console.log("Station Number ",i+1);
				console.log(`Station Name ${body.route[i].station.name} (${body.route[i].station.code})`);
				console.log(`Sheduled Arrival ${time1.join ('')}`);
				console.log(`Sheduled Departure ${time.join ('')}`);
				console.log(`Halt ${body.route[i].halt}`);
				console.log(`Distance ${body.route[i].distance}`);
				console.log(`Day No ${body.route[i].day}`);
			}
			console.log("--------------------------------------------------------------------------------------");
			}}
		}
		var last=body.route.length;
		var time = body.route[last-1].scharr;
		 	time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
			if (time.length > 1) { // If time format correct
    		time = time.slice (1);  // Remove full string match value
    		time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    		time[0] = +time[0] % 12 || 12; // Adjust hours
			console.log(`Train Name ${body.train.name}`);
			console.log(`Train No.  ${body.train.number}`);
			console.log(`Train Last Station ${body.route[last-1].station.name} (${body.route[last-1].station.code})`);
			console.log("Train Reaches At ",time.join (''));
			console.log(`Distance ${body.route[last-1].distance}`);
	}
	}
});
rl.close();
});
