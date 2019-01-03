//var mongo = require('./mongo');
//var bcrypt = require('bcrypt');
var bcrypt = require('bcryptjs');
var { users } = require('../models/user');
var {mongoose} = require('../db/mongoose');

function handle_request(msg, callback){

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(msg.password, salt);
    console.log("The msg of signUp.js of kafka backend server is"+ JSON.stringify(msg.firstName));

    var traveler = new users({
        firstName: msg.firstName,
        lastName: msg.lastName,
        email: msg.email,
        password: hash,
        oort: "t"
    });
    console.log("________result traveler in signup.js________"+traveler);
    
   // callback(null,traveler);
   
    traveler.save().then((traveler) => {
        console.log("traveler created : ", traveler);
        callback(null,traveler);

    }, (err) => {
        console.log("Error Creating traveler");
        callback(err,"Error");
        //callback(err, "some error occured");
    })

}

exports.handle_request = handle_request;

/**
 *
 //Route to handle Post Request Call
app.post('/signUp', (req, res) => {
    console.log("Inside traveler sign up");

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    var traveler = new users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        oort: "t"
    });
    console.log(traveler);
    traveler.save().then((traveler) => {
        console.log("traveler created : ", traveler);
        res.sendStatus(200).end();
    }, (err) => {
        console.log("Error Creating traveler");
        res.sendStatus(400).end();
    })

});
 */