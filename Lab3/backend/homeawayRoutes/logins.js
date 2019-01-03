var express = require('express')
var router = express.Router()

var { users } = require('../models/user');
var { mongoose } = require('../db/mongoose');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var config = require('../config/settings');
var jwt = require('jsonwebtoken');
var kafka = require('../kafka/client');

router.post('/travelerLogin', (req, res) => {
    console.log("Inside traveler login");
    
    kafka.make_request('travelerLogin',req.body, function(err,results){     
        console.log('in result');
        console.log("_________result in logins.js __traveler____"+results);
        
        if (err){
            console.log("Inside err of traveler signup");
            res.sendStatus(400).end();
        }else{
            console.log("Inside success of traveler signup");
            console.log("typeof: "+typeof(results));
            if(typeof(results)=="string"){
                res.sendStatus(400).end();
            }else{
                /////////////jwt change/////////////////////
                var usertoken = { email: req.body.email }
                var token1 = jwt.sign(usertoken, config.secret, {
                    expiresIn: 10080 // in seconds
                });

                let infoWithToken = {
                    token: "JWT " + token1,
                    firstName: results.firstName,
                    lastName: results.lastName,
                    email: results.email
                } 
                res.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end(JSON.stringify(infoWithToken));
            }
                
        }
    });
}) 

//Route to handle Post Request Call
router.post('/ownerLogin', function (req, res) {

    console.log("Inside owner Login Post Request");
    kafka.make_request('ownerLogin',req.body, function(err,results){     
        console.log('in result');
        console.log("_________result in logins.js __traveler____"+results);
        
        if (err){
            console.log("Inside err of traveler signup");
            res.sendStatus(400).end();
        }else{
            console.log("Inside success of traveler signup");
            console.log("typeof: "+typeof(results));
            if(typeof(results)=="string"){
                res.sendStatus(400).end();
            }else{
                /////////////jwt change/////////////////////
                var usertoken = { email: req.body.email }
                var token1 = jwt.sign(usertoken, config.secret, {
                    expiresIn: 10080 // in seconds
                });

                let infoWithToken = {
                    token: "JWT " + token1,
                    firstName: results.firstName,
                    lastName: results.lastName,
                    email: results.email
                } 
                res.cookie('ownercookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end(JSON.stringify(infoWithToken));
            }
                
        }
    });
    
});

module.exports=router;