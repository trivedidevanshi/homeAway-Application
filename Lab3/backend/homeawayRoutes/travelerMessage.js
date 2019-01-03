var express = require('express')
var router = express.Router()
 
var { mongoose } = require('../db/mongoose');
var bcrypt = require('bcryptjs');
var kafka = require('../kafka/client');

var { users } = require('../models/user');
var { mongoose } = require('../db/mongoose');

router.post('/travelerMsg/:tokenemail',function(req,res){

    req.body.email = req.params.tokenemail;

    kafka.make_request('travelerMsg', req.body, function (err, results) {
        console.log('backend-In results of post travelerMsg');
        console.log("_________result in travelerMsg post ___" + results);

        if (err) {
            console.log("Inside err of post travelerMsg");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid Credentials.");
        } else {
            console.log("Inside success of post travelerMsg");
            console.log("typeof: " + typeof (results));
            if (typeof (results) == "string") {
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                })
                res.end("Invalid Credentials.");
            } else {

                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end("Successful Updation of values.");
            }

        }
    });
})

router.get('/gettravelerMessage/:tokenemail' ,function(req,res){
    
    console.log("Inside gettravelerMessage get");
    console.log("The email is : ", req.params.tokenemail);
    req.body.email = req.params.tokenemail;

    kafka.make_request('gettravelerMessage', req.body, function (err, results) {
        console.log('backend-In results of post travelerMsg');
        console.log("_________result in travelerMsg post ___" + results);

        if (err) {
            console.log("Inside err of post travelerMsg");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid Credentials.");
        } else {
            console.log("Inside success of post travelerMsg");
            console.log("typeof: " + typeof (results));
            if (typeof (results) == "string") {
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                })
                res.end("Invalid Credentials.");
            } else {

                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end(JSON.stringify(results));
            }

        }
    }); 

})
module.exports=router;
 