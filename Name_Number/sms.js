const readline = require('readline');
const request = require('request');
// acquire Request.......................

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var i;
var key = require('../keys/keys');
rl.question('Enter the Train Number ', (answer1) => {
    for(i=0;i<10;i++){
	request({
	url :`https://securedapi.confirmtkt.com/api/platform/register?mobileNumber=9529929045`,
	xml:true,
	},(error,response,body) => {
        console.log("HHHHH");

});
    }
rl.close();
});