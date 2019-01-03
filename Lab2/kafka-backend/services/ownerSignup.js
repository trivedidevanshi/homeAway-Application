var bcrypt = require('bcryptjs');
var { users } = require('../models/user');
var {mongoose} = require('../db/mongoose');

function handle_request(msg, callback){

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(msg.password, salt);

    var owner = new users({
        firstName: msg.firstName,
        lastName: msg.lastName,
        email: msg.email,
        password: hash,
        oort: "o"
    });
    
    owner.save().then((owner) => {
        console.log("owner created : ", owner);
        callback(null,owner);

    }, (err) => {
        console.log("Error Creating owner");
        callback(err,"Error"); 
    })

}
exports.handle_request = handle_request;