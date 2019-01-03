
var { users } = require('../models/user');
var { mongoose } = require('../db/mongoose');

function handle_request(msg, callback) {

    console.log("Inside kafka post user profile.");

    var traveleremail = msg.email;
    var searchedPropName = msg.searchedPropName;

    users.aggregate([
        { $unwind: '$travelerbooking' },
        { $match: { 'travelerbooking.propname': searchedPropName, 'email': traveleremail } },
        { $project: { _id: 0, travelerbooking: 1 } }
    ],
        function (err, result) {
            if (err) {
                console.log("These is an error in extracting searched props.", err);
                callback(err, "Error");
            } else {
                console.log("Success", result.length);
                callback(null, result);
            }
        })
}
exports.handle_request = handle_request;
