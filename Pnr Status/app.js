const readline = require('readline');
const request = require('request');
// acquire Request.......................

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var key = require('../keys/keys');
rl.question('Enter the PNR Number ', (answer1) => {
	request({
	url :`https://api.railwayapi.com/v2/pnr-status/pnr/${answer1}/apikey/${key.myKey}/`,
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
	else if(body.response_code === 221)
	{
		console.log("Invalid PNR");

	}
	else if(body.response_code === 220)
	{
		console.log("Flushed PNR");
		
	}
	else if(body.response_code === 500)
	{
		console.log("Invalid API key......");
	}
	else
	{
		console.log(`Pnr Number     ${body.pnr}`);
		console.log(`Date of Jou.   ${body.doj}`);
		console.log(`Train Name     ${body.train.name}`);
		console.log(`Train Number   ${body.train.number}`);
		console.log(`Train starts from ${body.from_station.name}( ${body.from_station.code})`);
		console.log(`Train last Station ${body.to_station.name}( ${body.to_station.code})`);
		console.log(`Chart Prepared ${body.chart_prepared}`);
		console.log(`Boarding Station :         ${body.boarding_point.name}( ${body.boarding_point.code})`);
		console.log(`Reservation Upto  :         ${body.reservation_upto.name}( ${body.to_station.code})`);		
		console.log(`No of Passengers ${body.total_passengers}`);
		console.log("Details of booking of all Passengers");
		for( i = 0; i<body.passengers.length; i++){
			console.log(`Passenger No ${body.passengers[i].no}`);
			console.log(`Current Status ${body.passengers[i].current_status}`);
			console.log(`Booking Status ${body.passengers[i].booking_status}`);	
		}
	
	}
});
rl.close();
});