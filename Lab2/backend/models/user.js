var mongoose = require('mongoose');

var users = mongoose.model('users',{
    firstName:{
        type : String,
        required : true
    },
    lastName:{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique:true
    },
    password : {
        type : String,
        required : true
    },
    oort : {
        type : String
    },
    aboutme : {
        type : String
    },
    city : {
        type : String
    },
    country : {
        type : String
    },
    company : {
        type : String
    },
    school : {
        type : String
    },
    hometown : {
        type : String
    },
    languages : {
        type : String
    },
    gender : {
        type : String
    },
    phonenumber : {
        type : Number
    },
    profileimage : {
        type : String
    },
    properties : {
        type : Array
    },
    travelerbooking : {
        type : Array
    },
    tmessage : {
        type : Array
    },
    omessage : {
        type : Array
    }
});

module.exports = {users};