var express = require('express')
var router = express.Router();

var { users } = require('../models/user');
var { mongoose } = require('../db/mongoose');

const path = require('path');
const fs = require('fs');

var kafka = require('../kafka/client');

//Route to handle get Request Call 
router.post('/ownerPropertyDashboard/:tokenemail', function (req, res) {

    var tokenemail = req.params.tokenemail;
    var pageNoClicked = req.body.pageNoClicked;
    console.log("Inside ownerPropertyDashboard GET Request");

    req.body.email = req.params.tokenemail;
    console.log("Inside get ownerPropDashboard backend");
    console.log("backend get ownerPropDashboard- req.body: ", req.body);

    kafka.make_request('ownerPropDashboard', req.body, function (err, result) {
        console.log('backend-In results of get ownerPropDashboard');
        console.log("_____result in travelerprofile.js get ownerPropDashboard: " + result);

        if (err) {
            console.log("Inside err of get ownerPropDashboard");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid Credentials.");
        } else {
            console.log("Inside success of get ownerPropDashboard");
            console.log("typeof: " + typeof (result));
            if (typeof (result) == "string") {
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                })
                res.end("Invalid Credentials.");
            } else {

                if (result[0].properties.length != 0) {

                    var i, file;
                    for (i = 0; i < result[0].properties.length; i++) {

                        file = result[0].properties[i].propPhotos;
                        var images = file.split(",");
                        var base64img = [];
                        for (var j = 0; j < images.length; j++) {
                            var fileLocation = path.join(__dirname, '../' + '/uploads', images[j]);
                            var img = fs.readFileSync(fileLocation);
                            base64img[j] = new Buffer(img).toString('base64');
                        }
                        var base64imgfinal = base64img.toString();
                        result[0].properties[i].propPhotos = base64imgfinal;

                    }

                    var elementtopush = {};
                    var props = [];
                    var finalResult = [];
                    for (var itr = 5 * (pageNoClicked - 1); itr < 5 * pageNoClicked; itr++) {
                        if (result[0].properties[itr] != undefined) {
                            console.log("itr: ", itr);
                            props.push(result[0].properties[itr]);
                        }
                    }
                    console.log("------the props is ----=\n", props.length);
                    elementtopush.properties = props;
                    finalResult.push(elementtopush);

                    var element = {};
                    element.pgNum = result[0].properties.length;
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