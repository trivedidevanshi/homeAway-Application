
var { users } = require('../models/user');
var { mongoose } = require('../db/mongoose');

function handle_request(msg, callback) {

    console.log("Inside kafka post onpicsubmit.");
    var email = msg.email;
    var uploadFileName = msg.uploadFileName;
    console.log("The email inside kafka post onpicsubmit is : ", email);

    users.update(
        { email: email },
        {
            profileimage: uploadFileName
        },
        { upsert: true }, function (err) {
            if (err) {
                console.log("Error in kafka - post onpicsubmit");
                callback(err, "Error");

            }
            else {
                let sendresult = {
                    message: "Success"
                }
                console.log("Kafka info updated in onpicsubmit is: ", sendresult);
                callback(null, sendresult);
            }
        }
    )
}
exports.handle_request = handle_request;