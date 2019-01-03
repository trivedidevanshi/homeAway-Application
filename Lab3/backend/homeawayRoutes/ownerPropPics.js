var express = require('express')
var router = express.Router()

///////////////////upload pic using multer////////////////////////////
const multer = require('multer');
const path = require('path');
const fs = require('fs');

var kafka = require('../kafka/client');

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

const uploadmultiple = multer({ storage: storage }).array('selectedFile', 5);

router.post('/multiple', (req, res) => {
    console.log("Inside multiple pic");

    uploadmultiple(req, res, function (err) {
        console.log("Requested files : ", req.files);
        res.end("success");
    })

});

router.post('/multiple/download/:file(*)', (req, res) => {
    console.log("Inside download file");
    var file = req.params.file;
    var fileLocation = path.join(__dirname,'../' + '/uploads', file);
    var img = fs.readFileSync(fileLocation);
    var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(base64img);
});

module.exports=router;