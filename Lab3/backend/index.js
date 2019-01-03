const port = process.env.PORT || 3001;
const multer = require('multer');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
app.set('view engine', 'ejs');


const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');


const path = require('path');
const fs = require('fs');

var { users } = require('./models/user');
var { mongoose } = require('./db/mongoose');

///////////////////routes///////////////////
var logins = require('./homeawayRoutes/logins');
var signups = require('./homeawayRoutes/signups');
var travelerprofile = require('./homeawayRoutes/travelerprofile');
var travelerTrips = require('./homeawayRoutes/travelerTrips');
var ownerPropPics = require('./homeawayRoutes/ownerPropPics');
var ownerPropPost = require('./homeawayRoutes/ownerPropPost');
var ownerPropDashboard = require('./homeawayRoutes/ownerPropDashboard');
var searchAndBookProp = require('./homeawayRoutes/searchAndBookProp');
var travelerMessage = require('./homeawayRoutes/travelerMessage');
var ownerMessage = require('./homeawayRoutes/ownerMessage');
var searchMyTrips = require('./homeawayRoutes/searchMyTrips');

/////////////////kafka///////////////////////
// var kafka = require('./kafka/client');
//////////////////passport jwt///////////////////////

var passport = require('passport'); 
//var config = require('./config/settings');
var jwt = require('jsonwebtoken');

// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });
///////////////////////////////////////////////////////

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,

}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

////////////////////////////////////////////////////////////////////

console.log("here");
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./config/passport')(passport);
/////////////////////////////////////////////////////////////////////////////

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

/////////////////////////////////Routes/////////////////////////////////////////
app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true
}));

app.post('/ownerLogin',logins);
app.post('/travelerLogin',logins);

app.post('/signUp',signups);
app.post('/ownerSignup',signups);

app.get('/userProfile/:tokenemail',requireAuth,travelerprofile);
app.post('/userProfile/:tokenemail',requireAuth,travelerprofile);
// app.post('/onPicSubmit/:tokenemail', upload.single('selectedFile'), requireAuth,travelerprofile);
app.post('/onPicSubmit/:tokenemail', requireAuth,travelerprofile);

app.get('/getPicName/:tokenemail', requireAuth, travelerprofile);
app.post('/download/:file(*)', travelerprofile);
 
app.post('/myTrips/:tokenemail',requireAuth, travelerTrips);


app.post('/multiple', ownerPropPics);
app.post('/multiple/download/:file(*)', ownerPropPics);

app.post('/ownerPricing/:tokenemail', requireAuth, ownerPropPost);

//app.get('/ownerPropertyDashboard/:tokenemail', requireAuth, ownerPropDashboard)
app.post('/ownerPropertyDashboard/:tokenemail', requireAuth, ownerPropDashboard)


app.post('/mainPage', requireAuth , searchAndBookProp);
app.get('/getSearchResult', requireAuth , searchAndBookProp);
app.post('/handleBooking/:tokenemail', requireAuth , searchAndBookProp);

app.post('/travelerMsg/:tokenemail',requireAuth,travelerMessage);
app.get('/gettravelerMessage/:tokenemail', requireAuth, travelerMessage);

app.get('/getownerMessage/:tokenemail', requireAuth, ownerMessage);
app.post('/ownerReply/:tokenemail',requireAuth, ownerMessage);

app.post('/searchMyTrips/:tokenemail', requireAuth ,searchMyTrips);
//////////////////////////////////////////////////////////////////////////


app.post('/myTripsFilterDate/:tokenemail',requireAuth,function(req,res){

    console.log("Inside Login Post Request");
    console.log("The email is : ", req.params.tokenemail);
    console.log("The body of response is : ",req.body);
    console.log("filterStartDate : ",req.body.filterStartDate);
    console.log("filterEndDate : ",req.body.filterEndDate);

    filterEndDate=req.body.filterEndDate;
    filterStartDate=req.body.filterStartDate;
    var traveleremail = req.params.tokenemail;
    users.find(
        { email: traveleremail },
        { travelerbooking: 1, _id: 0 },
        function (err, result) {
            if (err) {
                console.log("Error in kafka - get mytrips");
                //callback(err,"Error"); 
            } else {
                var newarr=[];
                console.log("Kafka info fetched from mytrips is: " , result); 
                //callback(null,result);
                console.log("---------------",result[0].travelerbooking.length);
                for(let i=0;i<result[0].travelerbooking.length;i++){
                    console.log(i+"th prop: "+result[0].travelerbooking[i].bookdateend);
                    var travelerbookstartdate = Date.parse(result[0].travelerbooking[i].bookdatestart);
                    var travelerbookenddate = Date.parse(result[0].travelerbooking[i].bookdateend);
                    if(Date.parse(filterStartDate)<=travelerbookstartdate && travelerbookenddate<=Date.parse(filterEndDate)){

                        var file = result[0].travelerbooking[i].propPhotos;
                        var images = file.split(",");
                        var base64img = [];
                        for (var j = 0; j < images.length; j++) {
                            var fileLocation = path.join(__dirname + '/uploads', images[j]); //add->   ,'../'
                            var img = fs.readFileSync(fileLocation);
                            base64img[j] = new Buffer(img).toString('base64');
                        }
                        var base64imgfinal = base64img.toString();
                        result[0].travelerbooking[i].propPhotos = base64imgfinal;
                        newarr.push(result[0].travelerbooking[i]);
                        //console.log("--------push this array: ",result[0].travelerbooking[i])

                    }
                }
                res.end(JSON.stringify(newarr));
            }
        })

    
})


//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");