var { users } = require('../models/user');
var {mongoose} = require('../db/mongoose');

function handle_request(msg, callback){

    console.log("Inside kafka handleBooking.");
    
    var tokenemail = msg.email;
    var sendarrivaldate = msg.sendarrivaldate;
    var senddepartdate = msg.senddepartdate;
 
    users.aggregate([
        { $unwind: '$properties' },
        { $match: { 'properties.propname': msg.bookpropertyname.propName } },
        { $project: { _id: 0, properties: 1, email: 1 } }
    ], function (err, user) {
        if (err) {

            console.log("Sorry. Can't find property.");
            callback(err,"Error"); 
        } else {

            console.log("Property found.")

            users.update(
                { email: tokenemail },
                {
                    $push: {
                        travelerbooking: {
                            propname: user[0].properties.propname,
                            propdescription: user[0].properties.propdescription,
                            proptype: user[0].properties.proptype,
                            bedroom: user[0].properties.bedroom,
                            accomodates: user[0].properties.accomodates,
                            bathrooms: user[0].properties.bathrooms,

                            propPhotos: user[0].properties.propPhotos,

                            country: user[0].properties.country,
                            address: user[0].properties.address,
                            city: user[0].properties.city,
                            state: user[0].properties.state,
                            zipcode: user[0].properties.zipcode,

                            pricepernight: user[0].properties.pricepernight,
                            owneremail: user[0].email,
                            bookdatestart: sendarrivaldate,
                            bookdateend: senddepartdate
                        }
                    }
                },
                { upsert: true }, function (err) {
                    if (err) {
                        console.log("Property was not booked.");
                        callback(err,"Error");
                    }
                    else {
                        users.updateOne(
                            { $and: [{ email: user[0].email }, { 'properties.propname': user[0].properties.propname }] },
                            {
                                $push: {
                                    'properties.$.bookeddates': {
                                        traveleremail: tokenemail,
                                        bookdatestart: sendarrivaldate,
                                        bookdateend: senddepartdate
                                    }
                                }
                            }, { upsert: true }, function (err) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    console.log("Updated blockdates in owner.");
                                }
                            })

                            
                        console.log("Property Booked!");
                        let sentdata = {
                            message:"success"
                        }
                        callback(null,sentdata);
                    }
                }
            )
        }
    }) 
}
exports.handle_request = handle_request;