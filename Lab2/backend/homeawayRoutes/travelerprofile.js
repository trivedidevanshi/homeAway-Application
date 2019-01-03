var express = require('express')
var router = express.Router()


var { users } = require('../models/user');
var { mongoose } = require('../db/mongoose');

///////////////////upload pic using multer////////////////////////////
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        console.log("pic res file: " + file.originalname);
        const newFilename = file.originalname;
        //const newFilename = `test${path.extname(file.originalname)}`;
        cb(null, newFilename);
    },
});
const upload = multer({ storage });

var kafka = require('../kafka/client');
///////////////////////////////////////////////////////////////////////

router.get('/userProfile/:tokenemail', function (req, res) {

    req.body.email = req.params.tokenemail;
    console.log("Inside user profile get backend");
    console.log("backend get user profile- req.body: ", req.body);
    kafka.make_request('getuserProfile', req.body, function (err, results) {
        console.log('backend-In results of get user profile');
        console.log("_________result in travelerprofile.js __get user profile____" + results);

        if (err) {
            console.log("Inside err of get user profile");
            res.sendStatus(400).end();
        } else {
            console.log("Inside success of get user profile");
            console.log("typeof: " + typeof (results));
            if (typeof (results) == "string") {
                res.sendStatus(400).end();
            } else {

                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end(JSON.stringify(results));
            }

        }
    });
});

//Route to handle Post Request Call
router.post('/userProfile/:tokenemail', function (req, res) {
    console.log("Inside userProfile Post Request");
    req.body.email = req.params.tokenemail;
    console.log("Inside user profile post backend");
    console.log("backend post user profile- req.body: ", req.body);

    kafka.make_request('postuserProfile', req.body, function (err, results) {
        console.log('backend-In results of post user profile');
        console.log("_________result in travelerprofile.js post user profile____" + results);

        if (err) {
            console.log("Inside err of post user profile");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid Credentials.");
        } else {
            console.log("Inside success of post user profile");
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

router.post('/onPicSubmit/:tokenemail', upload.single('selectedFile'), (req, res) => {
    console.log("Inside onPicSubmit post request");
    console.log("uploadFileName : ", req.file.originalname);

    req.body.email = req.params.tokenemail;
    req.body.uploadFileName = req.file.originalname;

    kafka.make_request('onPicSubmit', req.body, function (err, results) {
        console.log('backend-In results of post onPicSubmit');
        console.log("_________result in travelerprofile.js post onPicSubmit____" + results);

        if (err) {
            console.log("Inside err of post onPicSubmit");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid Credentials.");
        } else {
            console.log("Inside success of post onPicSubmit");
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

//Route to handle getPicName Request Call
router.get('/getPicName/:tokenemail', function (req, res) {

    console.log("Inside getPicName GET Request");

    req.body.email = req.params.tokenemail;

    kafka.make_request('getPicName', req.body, function (err, results) {
        console.log('backend-In results of post getPicName');
        console.log("_________result in travelerprofile.js post getPicName" + results);

        if (err) {
            console.log("Inside err of post getPicName");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid Credentials.");
        } else {
            console.log("Inside success of post getPicName");
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
                res.end(results.profileimage);
            }
        }
    });
});

router.post('/download/:file(*)', (req, res) => {
    console.log("Inside download file");
    var file = req.params.file;
    console.log("file: " + file);
    console.log("The dirname is: " + __dirname);
    var fileLocation = path.join(__dirname, '../' + '/uploads', file);
    var img = fs.readFileSync(fileLocation);
    var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(base64img);

});

module.exports = router;