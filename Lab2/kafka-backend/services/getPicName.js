
var { users } = require('../models/user');
var { mongoose } = require('../db/mongoose');

function handle_request(msg, callback) {

    console.log("Inside kafka post getpicname.");
    var email = msg.email;
    console.log("The email inside kafka post getpicname is : ", email);

    users.findOne({
        email: email
    }, function (err, user) {
        if (err) {
            console.log("Error in kafka - post getpicname");
            callback(err, "Error");
        } else {
            console.log("Kafka info updated in getpicname is: ", user);
            callback(null, user);
        }
    })
}
exports.handle_request = handle_request;