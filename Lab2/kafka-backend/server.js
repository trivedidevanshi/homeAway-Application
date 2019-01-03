var connection =  new require('./kafka/Connection');
//topics files
 
/////////////////homeaway imports/////////////
var signUp = require('./services/signUp.js');
var ownerSignup = require('./services/ownerSignup');
var travelerLogin = require('./services/travelerLogin');
var ownerLogin = require('./services/ownerLogin');
var getuserProfile = require('./services/getuserProfile');
var postuserProfile = require('./services/postuserProfile');
var onPicSubmit = require('./services/onPicSubmit');
var getPicName = require('./services/getPicName');
var myTrips = require('./services/myTrips');
var ownerPropPost = require('./services/ownerPropPost');
var ownerPropDashboard = require('./services/ownerPropDashboard');
var mainPage = require('./services/mainPage');
var handleBooking = require('./services/handleBooking');
var travelerMsg = require('./services/travelerMsg'); 
var gettravelerMessage = require('./services/gettravelerMessage'); 
var getownerMessage = require('./services/getownerMessage');  
var ownerReply = require('./services/ownerReply');   
var searchMyTrips = require('./services/searchMyTrips'); 
/////////////////////////////////////////////

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
 
///////////////homeaway topics///////////
handleTopicRequest("signUp",signUp)
handleTopicRequest("ownerSignup",ownerSignup)
handleTopicRequest("travelerLogin",travelerLogin)
handleTopicRequest("ownerLogin",ownerLogin)
handleTopicRequest("getuserProfile",getuserProfile)
handleTopicRequest("postuserProfile",postuserProfile)
handleTopicRequest("onPicSubmit",onPicSubmit)
handleTopicRequest("getPicName",getPicName)
handleTopicRequest("myTrips",myTrips)
handleTopicRequest("ownerPropPost",ownerPropPost)
handleTopicRequest("ownerPropDashboard",ownerPropDashboard)
handleTopicRequest("mainPage",mainPage)
handleTopicRequest("handleBooking",handleBooking)
handleTopicRequest("travelerMsg",travelerMsg) 
handleTopicRequest("gettravelerMessage",gettravelerMessage)
handleTopicRequest("getownerMessage",getownerMessage) 
handleTopicRequest("ownerReply",ownerReply)  
handleTopicRequest("searchMyTrips",searchMyTrips) 
/////////////////////////////////////////