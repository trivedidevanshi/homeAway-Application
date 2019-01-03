
var { users } = require('../models/user');
var {mongoose} = require('../db/mongoose');

function handle_request(msg, callback){

    console.log("Inside kafka post user profile.");
    var tokenemail = msg.email; 
    console.log("The email inside kafka post user profile is : ",tokenemail);

    var firstName = msg.profileFirstName;
    var lastName = msg.profileLastName;
    var aboutMe = msg.profileAboutMe;
    var city = msg.profileCity;
    var country = msg.profileCountry;
    var company = msg.profileCompany;
    var school = msg.profileSchool;
    var hometown = msg.profileHomeTown;
    var languages = msg.profileLanguages;
    var gender = msg.profileGender;
    var phoneNumber = msg.profilePhoneNumber;

    users.update(
        { email: tokenemail },
        {
            firstName: firstName,
            lastName: lastName,
            aboutme: aboutMe,
            city: city,
            country: country,
            company: company,
            school: school,
            hometown: hometown,
            languages: languages,
            gender: gender,
            phonenumber: phoneNumber
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
