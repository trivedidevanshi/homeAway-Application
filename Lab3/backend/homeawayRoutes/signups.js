var express = require('express')
var router = express.Router()
 
var { mongoose } = require('../db/mongoose');
var bcrypt = require('bcryptjs');
var kafka = require('../kafka/client');

var { users } = require('../models/user');
var { mongoose } = require('../db/mongoose');

//Route to handle Post Request Call
router.post('/signUp', (req, res) => { 

    console.log("Inside traveler sign up");

//    kafka.make_request('signUp',req.body, function(err,results){    
    kafka.make_request('signUpNew',req.body, function(err,results){     

        console.log('in result');
        console.log("_________result in index.js ______"+results);
        
        if (err){
            console.log("Inside err of traveler signup");
            res.sendStatus(400).end();
        }else{
            console.log("Inside success of traveler signup");
            console.log("typeof: "+typeof(results));
            if(typeof(results)=="string"){
                res.sendStatus(400).end();
            }else{
                res.sendStatus(200).end();
            }
        }
    });
});

router.post('/ownerSignup', function (req, res) {

    console.log("Inside owner Sign Up Post Request");
    
    kafka.make_request('ownerSignup',req.body, function(err,results){     
        console.log('in result');
        console.log("_________result in index.js ______"+results);
        
        if (err){
            console.log("Inside err of owner signup");
            res.sendStatus(400).end();
        }else{
            console.log("Inside success of owner signup");
            console.log("typeof: "+typeof(results));
            if(typeof(results)=="string"){
                res.sendStatus(400).end();
            }else{
                res.sendStatus(200).end();
            }
                
        }
    });

});

module.exports=router;