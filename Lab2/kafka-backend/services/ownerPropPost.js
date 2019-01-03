
var { users } = require('../models/user');
var {mongoose} = require('../db/mongoose');

function handle_request(msg, callback){

    console.log("Inside kafka post owner prop/pricing.");
    var tokenemail = msg.email; 
    console.log("The email inside kafka post user profile is : ",tokenemail);
    
    var headline = msg.headline;
    var propDescription = msg.propDescription;
    var propType = msg.propType;
    var bedroom = msg.bedroom;
    var accomodates = msg.accomodates;
    var bathrooms = msg.bathrooms;

    var propPhotos = msg.propPhotos;

    var country = msg.country;
    var address = msg.address;
    var city = msg.city;
    var state = msg.state;
    var zipcode = msg.zipcode;

    var availableStart = msg.availableStart;
    var availableEnd = msg.availableEnd;
    var pricePerNight = msg.pricePerNight;

    users.update(
        { email: tokenemail },
        {
            $push: {
                properties: {

                    propname: headline,
                    propdescription: propDescription,
                    proptype: propType,
                    bedroom: bedroom,
                    accomodates: accomodates,
                    bathrooms: bathrooms,

                    propPhotos: propPhotos,

                    country: country,
                    address: address,
                    city: city,
                    state: state,
                    zipcode: zipcode,

                    availablestart: availableStart,
                    availableend: availableEnd,
                    pricepernight: pricePerNight
                }
            }
        },
        { upsert: true }, function (err) {
            if (err) {
                console.log("Error in kafka - post user profile");
                callback(err,"Error");

            }
            else {
                let sendresult={
                    message : "Success" 
                }
                console.log("Kafka info updated in user profile is: " , sendresult); 
                callback(null,sendresult);
            }
        }
    )
}
exports.handle_request = handle_request;