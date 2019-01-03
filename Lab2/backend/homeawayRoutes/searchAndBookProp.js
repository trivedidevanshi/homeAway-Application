var express = require('express')
var router = express.Router();

var { users } = require('../models/user');
var { mongoose } = require('../db/mongoose');

const path = require('path');
const fs = require('fs');

var app = express();
app.set('view engine', 'ejs');

var kafka = require('../kafka/client');

//mainPage to handle Post Request Call
router.post('/mainPage', function (req, res) {

    console.log("Inside mainPage Post Request");

    app.set('sendarrivaldate', req.body.arrivalDate);
    app.set('senddepartdate', req.body.departDate);

    kafka.make_request('mainPage', req.body, function (err, results) {
        console.log('backend-In results of post mainpage___');
        console.log("_________result in mainpage___" + results);

        if (err) {
            console.log("Inside err of post mainpage___");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid Credentials.");
        } else {
            console.log("Inside success of post mainpage___");
            console.log("typeof: " + typeof (results));
            if (typeof (results) == "string") {
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                })
                res.end("Invalid Credentials.");
            } else {

                if (results.length == 0) {
                    console.log("no such prop");
                    app.set('searchResult', results);

                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Invalid Credentials.");
                } else {
                    app.set('searchResult', results);
                    console.log("The array which is set is : ", results);

                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Successful");
                }
            }

        }
    });
});

//Route to handle Post Request Call
router.get('/getSearchResult', function (req, res) {
    console.log("Inside get search result Post request");

    var ans = app.get('searchResult');
    var i, file;
    for (i = 0; i < ans.length; i++) {

        file = ans[i].propPhotos;
        var images = file.split(",");
        var base64img = [];

        for (var j = 0; j < images.length; j++) {
            var fileLocation = path.join(__dirname, '../' + '/uploads', images[j]);
            var img = fs.readFileSync(fileLocation);
            base64img[j] = new Buffer(img).toString('base64');
        }

        var base64imgfinal = base64img.toString();
        ans[i].propPhotos = base64imgfinal;
    }

    res.end(JSON.stringify(ans));

});


//handleBooking to handle Post Request Call
router.post('/handleBooking/:tokenemail', function (req, res) {

    console.log("Inside handleBooking Post Request"); 
    
    req.body.email = req.params.tokenemail;
    req.body.sendarrivaldate = app.get('sendarrivaldate');
    req.body.senddepartdate = app.get('senddepartdate');
 
    kafka.make_request('handleBooking', req.body, function (err, results) {
        console.log('backend-In results of post handlebooking');
        console.log("_________result in handlebooking post ownerPricing____" + results);

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

module.exports = router;