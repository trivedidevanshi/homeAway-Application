var express = require('express')

const graphql = require('graphql');
const _ = require('lodash');
var bcrypt = require('bcryptjs');
var { users } = require('../models/user');
var { mongoose } = require('../db/mongoose');

var app = express();
app.set('view engine', 'ejs');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const BookedDateType = new GraphQLObjectType({
    name: 'BookedDate',
    fields: () => ({
        traveleremail: { type: GraphQLString },
        bookdatestart: { type: GraphQLString },
        bookdateend: { type: GraphQLString }
    })
});

const PropertyType = new GraphQLObjectType({
    name: 'Property',
    fields: () => ({

        propname: { type: GraphQLString },
        propdescription: { type: GraphQLString },
        proptype: { type: GraphQLString },
        bedroom: { type: GraphQLString },
        accomodates: { type: GraphQLString },
        bathrooms: { type: GraphQLString },
        propPhotos: { type: GraphQLString },
        country: { type: GraphQLString },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        availablestart: { type: GraphQLString },
        availableend: { type: GraphQLString },
        bookdatestart: { type: GraphQLString },
        bookdateend: { type: GraphQLString },
        pricepernight: { type: GraphQLString },
        bookeddates: {
            type: new GraphQLList(BookedDateType)
        }

    })
});


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        oort: { type: GraphQLString },
        aboutme: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        company: { type: GraphQLString },
        school: { type: GraphQLString },
        hometown: { type: GraphQLString },
        languages: { type: GraphQLString },
        gender: { type: GraphQLString },
        phonenumber: { type: GraphQLString },
        profileimage: { type: GraphQLString },
        properties: {
            type: new GraphQLList(PropertyType),
        },
        travelerbooking: {
            type: new GraphQLList(PropertyType),
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        userLogin: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            async resolve(parent, args) {
                console.log("----------------------", args);
                const user = await users.findOne({
                    email: args.email
                })
                if (user && bcrypt.compareSync(args.password, user.password) && user.oort == "o") {
                    return user;
                }
                else {
                    return "User does not exists";
                }
            }
        },

        travelerLogin: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            async resolve(parent, args) {
                console.log("----------------------", args);
                const user = await users.findOne({
                    email: args.email
                })
                if (user && bcrypt.compareSync(args.password, user.password) && user.oort == "t") {
                    return user;
                }
                else {
                    return "User does not exists";
                }
            }
        },

        getUserProfileQuery: {
            type: UserType,
            args: {
                email: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log("----------------------", args);
                const user = await users.findOne({
                    email: args.email
                })

                return user;
            }
        },

        getPropertyDashboardQuery: {
            type: UserType,
            args: {
                email: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log("----------------------", args);
                const user = await users.find(
                    { email: args.email },
                    { properties: 1, _id: 0, email: 1 })

                console.log("the result is: ", user[0])
                return user[0];
            }
        },

        searchResultQuery: {
            type: UserType,
            args: {
                email: { type: GraphQLString }
            },
            async resolve(parent, args) {

                var properties = app.get('searchResult')
                var sendData = {
                    "properties": []
                }

                for (var i = 0; i < properties.length; i++)
                    sendData.properties.push(properties[i]);
                console.log("_____________sendData____________", sendData)

                return sendData;
            }
        },
        myTripQuery: {
            type: UserType,
            args: {
                email: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log("----------------------", args.email);
                const user = await users.find(
                    { email: args.email },
                    { travelerbooking: 1, email: 1, _id: 0 })

                console.log("the result to send is: ", user[0])
                return user[0];
            }
        }

        
    }
});

var count = 10;

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTraveler: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {

                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(args.password, salt);
                var traveler = new users({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: hash,
                    oort: "t"
                });
                console.log("________result traveler in signup.js________" + traveler);

                var result = await traveler.save()
                console.log("The received result is : ", result);
                return traveler;

            }
        },

        addOwner: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {

                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(args.password, salt);
                var owner = new users({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: hash,
                    oort: "o"
                });
                console.log("________result owner in signup.js________" + owner);

                var result = await owner.save()
                console.log("The received result is : ", result);
                return owner;

            }
        },

        postUserProfileMutation: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                oort: { type: GraphQLString },

                aboutme: { type: GraphQLString },
                city: { type: GraphQLString },
                country: { type: GraphQLString },
                company: { type: GraphQLString },
                school: { type: GraphQLString },
                hometown: { type: GraphQLString },
                languages: { type: GraphQLString },
                gender: { type: GraphQLString },
                phonenumber: { type: GraphQLString }
            },
            async resolve(parent, args) {
                var result = await users.update(
                    { email: args.email },
                    {
                        firstName: args.firstName,
                        lastName: args.lastName,
                        aboutme: args.aboutme,
                        city: args.city,
                        country: args.country,
                        company: args.company,
                        school: args.school,
                        hometown: args.hometown,
                        languages: args.languages,
                        gender: args.gender,
                        phonenumber: args.phonenumber
                    }, { upsert: true }
                )
                console.log("The received result is : ", result);
                return result;
            }
        },

        mainPageMutation: {
            type: PropertyType,
            args: {
                city: { type: GraphQLString },
                availablestart: { type: GraphQLString },
                availableend: { type: GraphQLString },
                accomodates: { type: GraphQLString }
            },
            async resolve(parent, args) {

                var queriedarrivalDate = Date.parse(args.availablestart);
                var querieddepartDate = Date.parse(args.availableend);
                var newarr = [];

                var result = await users.aggregate([
                    { $unwind: '$properties' },
                    { $match: { 'properties.city': args.city, 'properties.accomodates': { $gte: args.accomodates } } },
                    { $project: { _id: 0, properties: 1 } }
                ],
                    function (err, user) {
                        if (err) {
                            console.log("These is an error in extracting searched props.");
                            return err;

                        } else {

                            if (user.length == 0) {
                                console.log("!!!!!!!!!!!!!!!!!!!!!!user length is 0!!!!!!!!!!!!!!!!!!!!!!!!!");
                                return newarr;
                            }
                            //console.log("------the result is : ", user);

                            console.log("!!!!!!!!!!!!!!!!!!!!!!user length is !!!!!!!!!!!!!!!!!!!!!!!!!", user.length);
                            for (let i = 0; i < user.length; i++) {
                                console.log("\n\ndate start: ", Date.parse(user[i].properties.availablestart), " <= ", queriedarrivalDate)
                                console.log("\n\ndate end: ", querieddepartDate, " <= ", Date.parse(user[i].properties.availableend))

                                if (Date.parse(user[i].properties.availablestart) <= queriedarrivalDate && querieddepartDate <= Date.parse(user[i].properties.availableend)) {
                                    console.log("------------------this prop falls in date can be booked-----------------------", user[i].properties.propname)
                                    newarr.push(user[i].properties);
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!", newarr);

                                } else {
                                    console.log("------------------this prop DOES NOT fall in date cannt be booked-----------------------", user[i].properties.propname)
                                }

                            }
                        }
                    })

                console.log("The result is ----newarr----: ", newarr);
                app.set('searchResult', newarr);
                app.set('sendarrivaldate', args.availablestart);
                app.set('senddepartdate', args.availableend);
                return newarr;
            }
        },

        handleBookingMutation: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                propname: { type: GraphQLString }
            },
            async resolve(parent, args) {

                console.log("booked date arrival : ", app.get('sendarrivaldate'));

                console.log("------------------------heree--------------", args.propname);
                var name = args.propname;
                var result = await users.aggregate([
                    { $unwind: '$properties' },
                    { $match: { 'properties.propname': args.propname.slice(1, args.propname.length - 1) } },
                    { $project: { _id: 0, properties: 1, email: 1 } }
                ], function (err, user) {
                    if (err) {

                        console.log("Sorry. Can't find property.", err);
                        return err;
                    } else {

                        console.log("Property found.")

                        users.update(
                            { email: args.email },
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
                                        bookdatestart: app.get('sendarrivaldate'),
                                        bookdateend: app.get('senddepartdate')
                                    }
                                }
                            },
                            { upsert: true }, function (err) {
                                if (err) {
                                    console.log("Property was not booked.", err);
                                    return err;
                                }
                                else {
                                    users.updateOne(
                                        { $and: [{ email: user[0].email }, { 'properties.propname': user[0].properties.propname }] },
                                        {
                                            $push: {
                                                'properties.$.bookeddates': {
                                                    traveleremail: args.email,
                                                    bookdatestart: app.get('sendarrivaldate'),
                                                    bookdateend: app.get('senddepartdate')
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
                                        message: "success"
                                    }
                                    return sentdata;
                                }
                            }
                        )
                    }
                })

            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});