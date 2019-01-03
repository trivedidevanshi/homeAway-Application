var express = require('express')
var router = express.Router();

var { users } = require('../models/user');
var { mongoose } = require('../db/mongoose');

var kafka = require('../kafka/client');

//Route to handle Post Request Call
router.post('/ownerPricing/:tokenemail', function (req, res) {

    console.log("Inside ownerPricing Post Request");
    
    req.body.email = req.params.tokenemail;

    console.log("Inside ownerPricing post backend");
    console.log("backend post ownerPricing- req.body: ", req.body);

    kafka.make_request('ownerPropPost', req.body, function (err, results) {
        console.log('backend-In results of post ownerPricing');
        console.log("_________result in travelerprofile.js post ownerPricing____" + results);

        if (err) {
            console.log("Inside err of post ownerPricing");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid Credentials.");
        } else {
            console.log("Inside success of post ownerPricing");
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
});
module.exports=router;