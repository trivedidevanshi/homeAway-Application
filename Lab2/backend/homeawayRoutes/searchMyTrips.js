var express = require('express')
var router = express.Router()

var bcrypt = require('bcryptjs');
var kafka = require('../kafka/client');

var { users } = require('../models/user');
var { mongoose } = require('../db/mongoose');

const path = require('path');
const fs = require('fs');

router.post('/searchMyTrips/:tokenemail', function (req, res) {

    console.log("Inside _______________ get");
    console.log("The email is : ", req.params.tokenemail);
    console.log("Req body data: ", req.body.searchedPropName);
    req.body.email = req.params.tokenemail;

    kafka.make_request('searchMyTrips', req.body, function (err, result) {
        console.log('in result');

        if (err) {
            console.log("Inside err of traveler signup");
            res.sendStatus(400).end();
        } else {
            console.log("Inside success of traveler signup");
            console.log("typeof: " + typeof (result));
            if (typeof (result) == "string") {
                res.sendStatus(400).end();
            } else {
                if (result.length != 0) {

                    var i, file;
                    for (i = 0; i < result.length; i++) {

                        file = result[i].travelerbooking.propPhotos;
                        var images = file.split(",");
                        var base64img = [];
                        for (var j = 0; j < images.length; j++) {
                            var fileLocation = path.join(__dirname, '../' + '/uploads', images[j]);
                            var img = fs.readFileSync(fileLocation);
                            base64img[j] = new Buffer(img).toString('base64');
                        }
                        var base64imgfinal = base64img.toString();
                        result[i].travelerbooking.propPhotos = base64imgfinal;
                    }

                    console.log("Successssss");
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end(JSON.stringify(result));
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Success");

                }
            }

        }
    });
})
module.exports = router;
