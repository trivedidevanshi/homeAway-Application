var express = require('express')
var router = express.Router()

var { users } = require('../models/user');
var { mongoose } = require('../db/mongoose');

const path = require('path');
const fs = require('fs');

var kafka = require('../kafka/client');

//Route to handle Post Request Call 
router.post('/myTrips/:tokenemail', function (req, res) {

    console.log("Inside mytrips GET Request");
    req.body.email = req.params.tokenemail;
    console.log("Inside get mytrips backend");
    console.log("backend get mytrips- req.body: ", req.body);
    var pageNoClicked = req.body.pageNoClicked;
    console.log("Backend pageNoClicked ", pageNoClicked);


    kafka.make_request('myTrips', req.body, function (err, result) {
        console.log('backend-In results of get mytrips');
        console.log("_____result in travelerprofile.js get mytrips____" + result);

        if (err) {
            console.log("Inside err of get mytrips");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid Credentials.");
        } else {
            console.log("Inside success of get mytrips");
            console.log("typeof: " + typeof (result));
            if (typeof (result) == "string") {
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                })
                res.end("Invalid Credentials.");
            } else {

                console.log("------------on load result--------", result);
                console.log("------------on load result length--------", result[0].travelerbooking.length);

                if (result[0].travelerbooking.length != 0) {

                    var i, file;
                    for (i = 0; i < result[0].travelerbooking.length; i++) {

                        file = result[0].travelerbooking[i].propPhotos;
                        var images = file.split(",");
                        var base64img = [];
                        for (var j = 0; j < images.length; j++) {
                            var fileLocation = path.join(__dirname, '../' + '/uploads', images[j]);
                            var img = fs.readFileSync(fileLocation);
                            base64img[j] = new Buffer(img).toString('base64');
                        }
                        var base64imgfinal = base64img.toString();
                        result[0].travelerbooking[i].propPhotos = base64imgfinal;
                    }

                    ////////////////////PAGINATION///////////////// 
                    var elementtopush = {};
                    var props = [];
                    var finalResult = [];
                    for (var itr = 5 * (pageNoClicked - 1); itr < 5 * pageNoClicked; itr++) {
                        if (result[0].travelerbooking[itr] != undefined) {
                            console.log("itr: ", itr);
                            console.log("the " + itr + "th prop is " + result[0].travelerbooking[itr].propname);
                            props.push(result[0].travelerbooking[itr]);
                        }
                    }
                    console.log("------the props is ----=\n", props.length);
                    elementtopush.travelerbooking = props;
                    finalResult.push(elementtopush);

                    var element = {};
                    element.pgNum = result[0].travelerbooking.length;
                    finalResult.push(element);

                    console.log("Success");
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })

                    res.end(JSON.stringify(finalResult));

                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Success");

                }
            }
        }
    });
});

module.exports = router;