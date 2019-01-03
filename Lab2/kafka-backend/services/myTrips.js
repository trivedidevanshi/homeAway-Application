
var { users } = require('../models/user');
var {mongoose} = require('../db/mongoose');

function handle_request(msg, callback){

    console.log("Inside kafka post mytrips.");
    var email = msg.email; 
    console.log("The email inside kafka post mytrips is : ",email);

    users.find(
        { email: email },
        { travelerbooking: 1, _id: 0 },
        function (err, result) {
            if (err) {
                console.log("Error in kafka - get mytrips");
                callback(err,"Error"); 
            } else {
                console.log("Kafka info fetched from mytrips is: " , result); 
                callback(null,result);
            }
        })
}
exports.handle_request = handle_request;