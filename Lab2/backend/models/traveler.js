var mongoose = require('mongoose');

var travelers = mongoose.model('travelers',{
    tfirstName:{
        type : String
    },
    tlastName:{
        type : String
    },
    traveleremail :{
        type : String
    },
    password : {
        type : String
    }
});

module.exports = {travelers};

