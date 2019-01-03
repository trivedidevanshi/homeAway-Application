var bcrypt = require('bcryptjs');
var { users } = require('../models/user');
var { mongoose } = require('../db/mongoose');

function handle_request(msg, callback) {

    var replypropName = msg.replypropName;
    var replytravelerMessage = msg.replytravelerMessage;
    var replytravelerEmail = msg.replytravelerEmail;
    var replymessage = msg.replymessage;
    var ownerEmail = msg.email;

    users.aggregate([
        { $unwind: '$tmessage' },
        { $match: { 'tmessage.propName': replypropName, 'tmessage.msg': replytravelerMessage, 'email': replytravelerEmail } },
        { $project: { _id: 0, tmessage: 1, email: 1 } }
    ],
        function (err, user) {
            if (err) {
                console.log("The error is : ", err);
                callback(err, "Error");
            } else {
                // console.log("The result is : ", user[0].email);

                if (user.length > 0) {
                    users.updateOne(
                        { $and: [{ email: user[0].email }, { 'tmessage.msg': replytravelerMessage }] },
                        { $set: { "tmessage.$.ownerReply": replymessage } }
                        , { upsert: true }, function (err) {
                            if (err) {
                                console.log("The error is : ", err);
                                callback(err, "Error");
                            }
                            else {
                                console.log("Updated replies in traveler.");
                            }
                        })
                    ///owner reply update
                    users.updateOne(
                        { $and: [{ email: ownerEmail }, { 'omessage.msg': replytravelerMessage }] },
                        { $set: { "omessage.$.ownerReply": replymessage } }
                        , { upsert: true }, function (err) {
                            if (err) {
                                console.log(err);
                                callback(err, "Error");
                            }
                            else {
                                console.log("Updated replies in owner.");
                            }
                        })

                    let data = {
                        message: "success"
                    }
                    callback(null, data);

                } else {
                    callback(err, "Error");
                }
            }
        })


}
exports.handle_request = handle_request;
