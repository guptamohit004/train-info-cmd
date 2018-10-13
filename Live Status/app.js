const readline = require('readline');
const request = require('request');
// acquire Request.......................

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var key = require('../keys/keys');

rl.question('Enter the Train Number ', (answer1) => {
    rl.question('Enter the Date in Format (DD-MM-YYYY): ', (answer2) => {
        request({
            url :`https://api.railwayapi.com/v2/live/train/${answer1}/date/${answer2}/apikey/${key.myKey}/`,
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
            var dt = new Date();
            console.log(`Time :                                           ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`);
            for( i = 1; i<body.route.length; i++){
                if(body.route[i].has_arrived){
            console.log(`Station                                          ${body.route[i].station.name}`);
            console.log(`Sheduled Departure                               ${body.route[i].schdep}`);
            console.log(`Actual   Departure 			         ${body.route[i].actdep}`);
            console.log(`Late By          				 ${body.route[i].status}`);
            console.log('---------------------------------------------------------------------------------------------------------------------------------------');
                }
            }
            console.log('---------------------------------------------------------------------------------------------------------------------------------------')
            console.log(`Train No   					 ${body.train.number}`);
            console.log(`Train Name 					 ${body.train.name}`);
            console.log(`Start Date 				         ${body.start_date}`);
            console.log(`Train starts from 			         ${body.route[0].station.name}`);
            console.log(`Sheduled Departure 			         ${body.route[0].schdep}`);
            console.log(`Actual   Departure			    	 ${body.route[0].actdep}`);
            console.log(`Late By           			 	 ${body.route[0].status}`);
            console.log(`Status     				 	 ${body.position}`);
            console.log(`Currenty At 					 ${body.current_station.name}`);
            }
        });
        rl.close();
    });
});