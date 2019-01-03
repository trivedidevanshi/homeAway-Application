
var { users } = require('../models/user');
var {mongoose} = require('../db/mongoose');

function handle_request(msg, callback){

    console.log("Inside kafka get user profile.");
    var email = msg.email; 
    console.log("The email inside kafka get user profile is : ",email);

    users.findOne({
        email: email
    }, function (err, user) {
        if (err) {
            console.log("Error in kafka - get user profile");
            callback(err,"Error"); 
        } else if (user.oort == "t") {
            console.log("Kafka info fetched from user get profile is: " , user); 
            callback(null,user); 
        } else{
            console.log("Error in kafka - get user profile - no such user exists");
            callback(err,"No user exists"); 
        }
    })

}
exports.handle_request = handle_request;
