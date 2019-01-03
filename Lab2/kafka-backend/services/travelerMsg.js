var { users } = require('../models/user');
var { mongoose } = require('../db/mongoose');

function handle_request(msg, callback) {

    console.log("Inside kafka handleBooking.");

    var traveleremail = msg.email;

    users.update(
        { email: traveleremail },
        {
            $push: {
                tmessage: {

                    propName: msg.propName,
                    msg: msg.msg
                }
            }
        },
        { upsert: true }, function (err) {
            if (err) {
                console.log(err);
                callback(err,"Error");

            }
            else {

                users.aggregate([
                    { $unwind: '$properties' },
                    { $match: { 'properties.propname': msg.propName } },
                    { $project: { _id: 0, email: 1 } }
                ],
                    function (err, result) {
                        if (err) {
                            console.log("These is an error in user aggregate.");
                            callback(err,"Error");
                        } else {
                           // console.log("--------------------------------------------");
                           // console.log("Props queried for are :" + result[0].email);

                            users.update(
                                { email: result[0].email },
                                {
                                    $push: {
                                        omessage: {
                                            propName: msg.propName,
                                            msg: msg.msg,
                                            travelerEmail: traveleremail
                                        }
                                    }
                                },
                                { upsert: true }, function (err) {
                                    if (err) {
                                        console.log("Property was not booked.");
                                        callback(err,"Error");

                                    }
                                    else {
                                        console.log("Owner msg updated!");
                                    }
                                }
                            )
                        }
                    })

                console.log("Message Booked!");
                let sentdata = {
                    message:"success"
                }
                callback(null,sentdata);
            }
        }
    )

}
exports.handle_request = handle_request;