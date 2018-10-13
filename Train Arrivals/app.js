const readline = require('readline');
const request = require('request');
// acquire Request.......................
var i,code;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var key = require('../keys/keys');
rl.question('Enter the Station Name       : ', (answer1) => {
    rl.question('Enter the Hours (2 or 4)     : ', (answer2) => {
        var encodedName = encodeURIComponent(answer1);
        request({
            url :`https://api.railwayapi.com/v2/name-to-code/station/${encodedName}/apikey/${key.myKey}/`,
            json:true,
        },(error,response,body) => {
            for( i = 0; i<body.stations.length; i++){
                if(body.stations[i].name == answer1.toUpperCase())
                {
                    code = body.stations[i].code;
                }
            }
            request({
                url :`https://api.railwayapi.com/v2/arrivals/station/${code}/hours/${answer2}/apikey/y7xn9117p0/`,
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
                else{
                    console.log('---------------------------------------------------------------------------------------------------------------------------------------');
                    var newDate = new Date(Date.now());
                    var datee = `${newDate.toDateString()} ${newDate.toTimeString()}`;
                    console.log(datee);
                    console.log(`Total number of Arrivals                          ${body.total}`);
                    var total=body.total;
                    console.log('---------------------------------------------------------------------------------------------------------------------------------------');
                    for( i = 0; i<total; i++){
                        console.log(`Train Number                                  ${body.trains[i].number}`);
                        console.log(`Train Name                                    ${body.trains[i].name}`);
                        console.log('---------------------------------------------------------------------------------------------------------------------------------------');
                        console.log(`Sheduled Arrival                              ${body.trains[i].scharr}`);
                        console.log(`Actual  Arrival                               ${body.trains[i].actarr}`);
                        console.log(`Delay in Arrival                              ${body.trains[i].delayarr}`);
                        console.log(`Sheduled Departure                            ${body.trains[i].schdep}`);
                        console.log(`Actual Departure                              ${body.trains[i].actdep}`);
                        console.log(`Delay in Departure                            ${body.trains[i].delaydep}`);
                        console.log('---------------------------------------------------------------------------------------------------------------------------------------');
                    }
            }
            });
        }
        )
        rl.close();
    });
});