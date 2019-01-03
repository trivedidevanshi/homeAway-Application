'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
//var db = require('../app/db');
var config = require('./settings');
var { users } = require('../models/user');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        users.findOne({email: jwt_payload.email}, function (err,res) {
            if(err){
                return callback(err, false);
            }else{
            var user = res;
            delete user.password;
            callback(null, user);}
        });
    }));
};
