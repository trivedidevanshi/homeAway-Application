var express = require('express')
var router = express.Router()

var { mongoose } = require('../db/mongoose');
var bcrypt = require('bcryptjs');
var kafka = require('../kafka/client');

var { users } = require('../models/user');
var { mongoose } = require('../db/mongoose');

router.get('/getownerMessage/:tokenemail', function (req, res) {

    console.log("Inside getownerMessage get");
    console.log("The email is : ", req.params.tokenemail);

    req.body.email = req.params.tokenemail;

    kafka.make_request('getownerMessage', req.body, function (err, results) {
        console.log('backend-In results of post getownerMessage');
        console.log("_________result in getownerMessage post ___" + results);

        if (err) {
            console.log("Inside err of post getownerMessage");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid Credentials.");
        } else {
            console.log("Inside success of post getownerMessage");
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


router.post('/ownerReply/:tokenemail', function (req, res) {

    console.log("Inside ownerReply Post Request");
    console.log("The email is : ", req.params.tokenemail);
    req.body.email = req.params.tokenemail;
    kafka.make_request('ownerReply', req.body, function (err, results) {
        console.log('backend-In results of post ownerReply');
        console.log("_________result in ownerReply post ___" + results);

        if (err) {
            console.log("Inside err of post ownerReply");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid Credentials.");
        } else {
            console.log("Inside success of post ownerReply");
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
                res.end("Success");
            }

        }
    });
})

module.exports = router;