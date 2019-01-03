var supertest = require('supertest');
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');
var should = chai.should();

global.expect = chai.expect;
global.app = app;
global.request = supertest(app);
chai.use(chaiHttp);

describe('Test Cases', function () {
    it('Sign Up Test 2', function (done) {
        request.post('/signUp')
            .send({
                firstName: 'testdevu',
                lastName: 'testtriv',
                email: 'testdevu@gmail.com',
                password: 'admin',
                oort: 't',
            })
            .expect(400)
            .end(function (err, res) {
                done(err);
            });
    });

    it('Sign Up Test ', function (done) {
        request.post('/signUp')
            .send({
                
                firstName: 'testdevu1',
                lastName: 'testtriv1',
                email: 'testdevu1@gmail.com',
                password: 'admin',
                oort: 't',
            })
            .expect(400)
            .end(function (err, res) {
                done(err);
            });
    });

  /*  it('Login Test', function (done) {
        request.post('/travelerLogin')
            .send({
                username: 'hp@gmail.com',
                password: '123456',
                
            })
            .expect(200)
            .end(function (err, res) {
                done(err);
            });
    });

    it('Get Profile Details', function (done) {
        request.get('/userProfile')
            .expect(200)
            .end(function (err, res) {
                if(err)done(err);
                chai.assert.equal(res.body.fname, 'Harshil')
                done()
            });
    });
/*
    it('Update Profile Details', function (done) {
        request.put('/updateprofile?email=hp@gmail.com')
            .send({
                fname: 'Harshil', 
                lname: 'Patel'              
            })
            .expect(200)
            .end(function (err, res) {
                done(err);
            });
    });

    it('Get Booked Properties', function (done) {
        request.get('/gettravellerbookings?email=hp@gmail.com&pageNo=1')
            .expect(200)
            .end(function (err, res) {
                if(err) done(err);
                chai.assert.equal(res.body.properties.length, 5)
                done()
            });
    });*/

});
