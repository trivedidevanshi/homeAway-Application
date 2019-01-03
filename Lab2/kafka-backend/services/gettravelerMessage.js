var { users } = require('../models/user');
var { mongoose } = require('../db/mongoose');

function handle_request(msg, callback) {

    console.log("Inside kafka handleBooking.");

    var traveleremail = msg.email;
    users.find({
        email: traveleremail
    }, function (err, user) {
        if (err) { 
            console.log("Invalid Credentials");
            callback(err,"Error");
            
        } else {
            console.log("Successfully accessed traveler messages: " + JSON.stringify(user[0].tmessage));
 
            callback(null,user[0].tmessage);
        }
    })

}
exports.handle_request = handle_request;