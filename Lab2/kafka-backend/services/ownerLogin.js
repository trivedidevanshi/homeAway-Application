var bcrypt = require('bcryptjs');
var { users } = require('../models/user');
var {mongoose} = require('../db/mongoose');

function handle_request(msg, callback){

        
    var email = msg.email;
    var password = msg.password;

    users.findOne({
        email: email
    }, function (err, user) {
        if (err) {
           
            console.log("Error Logging in to traveler");
            callback(err,"Error"); 

        } else if (user && bcrypt.compareSync(password, user.password) && user.oort == "o") {

            console.log("User to be logged in : ", user);
            callback(null,user);
            
        } else{
            console.log("Error Logging in to traveler");
            callback(err,"No traveler exists"); 
        }
    })
}
exports.handle_request = handle_request;