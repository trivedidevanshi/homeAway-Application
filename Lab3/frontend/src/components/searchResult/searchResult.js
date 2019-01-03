import React, { Component } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';
import { Redirect } from 'react-router';

import cookie from 'react-cookies';
import { Link } from 'react-router-dom';

import { graphql, compose } from 'react-apollo';
import { withApollo } from 'react-apollo'
import { searchResultQuery } from '../../queries/queries'
 
import { handleBookingMutation } from '../../mutation/mutations';

import {ROOT_URL} from '../../root_url';

class searchResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            propName: '',
            propDescription: '',
            address: '',
            city: '',
            state: '',
            country: '',
            zipcode: '',
            propPhotos: '',

            bedrooms: '',
            propType: '',
            bathroom: '',
            accomodates: '',
            pricePerNight: '',

            rdata: [{}],
            gotData: false,
            gotoLocationFlag: false,
            flag: false,
            askQuestion:false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.handleBooking = this.handleBooking.bind(this);
        this.handleGotoLocation = this.handleGotoLocation.bind(this);
        this.askQue = this.askQue.bind(this);

    }

    handleBooking = (e) => {
        //  console.log("Book Property : ", e.target.value);
        const data = {
            bookpropertyname: e
        }

        console.log("The data being sent to the backend is : " + JSON.stringify(e.propName));
        var token = localStorage.getItem('token');
        var tokenemail = localStorage.getItem('tokenemail');

        this.props.handleBookingMutation({
            variables: { 
                propname: JSON.stringify(e.propName),
                email : tokenemail
            }, 
        }).then(response => {
            console.log("The result is : ", response);
            console.log("Success !!!!!!!");
                    this.setState({
                        flag: true,
                    })
                    alert("The Property has been booked!! Get ready and pack your bags!!");
             
        }).catch(err=>{
            console.log("this is the error", err);
            this.setState({
                flag: false
            })
            
        }) 
    }

    askQue = (e) => { 
        const data = {
            bookpropertyname: e
        }
        console.log("The prop for which que is to be asked is: " + JSON.stringify(e.propName));
        localStorage.setItem("inboxPropName",e.propName);
        console.log("The propname to msg(set to local storage is) : "+localStorage.getItem("inboxPropName"));
        this.setState({
            askQuestion: true,
        })
    }


    //handle logout to destroy the cookie
    handleLogout = () => {
        //cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("travelerCookie");
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        
        var email=localStorage.getItem('tokenemail');
        this.props.client.query({
            query: searchResultQuery,
            variables: {
                email: email
            }
        }).then(res => {
            console.log("The response is : ", res);
            console.log("The props are : ", res.data.searchResultQuery.properties);
            console.log("The props length is : ", res.data.searchResultQuery.properties.length);

            let i = 0;
                for (i = 0; i < res.data.searchResultQuery.properties.length; i++) {
                    this.setState({
                        rdata: this.state.rdata.concat([{
                            propName: res.data.searchResultQuery.properties[i].propname,
                            propDescription: res.data.searchResultQuery.properties[i].propdescription,
                            address: res.data.searchResultQuery.properties[i].address,
                            city: res.data.searchResultQuery.properties[i].city,
                            state: res.data.searchResultQuery.properties[i].state,
                            country: res.data.searchResultQuery.properties[i].country,
                            zipcode: res.data.searchResultQuery.properties[i].zipcode,
                            propPhotos: res.data.searchResultQuery.properties[i].propPhotos,
                            bedrooms: res.data.searchResultQuery.properties[i].bedroom,
                            propType: res.data.searchResultQuery.properties[i].proptype,
                            bathroom: res.data.searchResultQuery.properties[i].bathrooms,
                            accomodates: res.data.searchResultQuery.properties[i].accomodates,
                            pricePerNight: res.data.searchResultQuery.properties[i].pricepernight
                        }])
                    });
                }
                this.setState({
                    gotData: true
                });


        }).catch(err => {
            console.log("the err is : ", err);
        })
     }

    handleGotoLocation = (e) => {
        this.setState({
            gotoLocationFlag: true
        })
    }

    render() {
        require('./searchResult.css');
        let redirect = null;
        //if(!cookie.load('cookie')){
        if(!localStorage.getItem("travelerCookie")){
            redirect = <Redirect to= "/mainPage"/>
        }
        if (this.state.gotoLocationFlag) {
            redirect = <Redirect to="/ownerLocation" />
        }
        if(this.state.flag){
            redirect = <Redirect to= "/mainPage"/>
        }
        if(this.state.askQuestion){
            redirect = <Redirect to= "/travelerMsg"/>
        }
        let DisplayData = null;
        let msginbox=null;
        let fname = localStorage.getItem('userfirstName');

        let UserNavbar = null;
        //if (cookie.load('cookie')) {
        if(localStorage.getItem("travelerCookie")){
            msginbox =(
                <li><a href="/travelerInbox"><span class="glyphicon glyphicon-envelope"></span></a></li>
              );
            UserNavbar = (
                <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">{fname} <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Inbox</a></li><hr></hr>
                        <li><a href="/myTrips">My Trips</a></li>
                        <li><a href="/userProfile">My Profile</a></li>
                        <li><a href="#">Account</a></li><hr></hr>
                        <li><a href="#">Owner Dashboard</a></li>
                        <li><Link to="/mainPage" onClick={this.handleLogout}>Logout</Link></li>
                    </ul>
                </li>
            );
        }
        else {
            UserNavbar = (
                <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Login <span class="caret"></span></a>
                    <ul class="dropdown-menu mydropdown">
                        <li><a href="/travelerLogin">Traveler Login</a></li>
                        <li><a href="/ownerLogin">Owner Login</a></li>
                    </ul>
                </li>
            );
        }

        var propPhotosArray;
        if (this.state.gotData) {
            DisplayData = (

                Object.keys(this.state.rdata).map(function (key) {

                    console.log('key: ', key);  // Returns key: 1 and key: 2
                    if (key != 0) {
                        var propName = this.state.rdata[key].propName;
                        /* var propDescription = this.state.rdata[key].propDescription;
                        var address = this.state.rdata[key].address;
                        var city = this.state.rdata[key].city;
                        var state = this.state.rdata[key].state;
                        var country = this.state.rdata[key].country;
                        var zipcode = this.state.rdata[key].zipcode; */
                        var propPhotos = this.state.rdata[key].propPhotos;


                        var bedrooms = this.state.rdata[key].bedrooms;
                        var propType = this.state.rdata[key].propType;
                        var bathroom = this.state.rdata[key].bathroom;
                        var accomodates = this.state.rdata[key].accomodates;
                        var pricePerNight = this.state.rdata[key].pricePerNight;

                        /* console.log(typeof (propPhotos));
                        propPhotosArray = propPhotos.split(",");
                        console.log("array length " + propPhotosArray.length);

                        for (var k = 0; k < propPhotosArray.length; k++) {
                            propPhotosArray[k] = "data:image/jpg;base64, " + propPhotosArray[k];
                        }
                        console.log("propPhotosArray[0]: " + propPhotosArray[0]);
                        console.log("propPhotosArray[1]: " + propPhotosArray[1]);
                        console.log("propPhotosArray[2]: " + propPhotosArray[2]); */

                        //let imagePreview = 'data:image/jpg;base64, ' + propPhotos;

                        console.log("item : " + propName);
                        return (
                            <div className="row dashboardProps">

                                <div className="info">
                                    {/* <div class="col-lg-9" > */}
                                    <h3>{propName}</h3>
                                    <h4>{bedrooms} BR {propType}|{bathroom} BA | Sleeps {accomodates}</h4>
                                    <br></br>
                                    <h2>${pricePerNight} per night</h2>
                                    <button onClick={() => this.handleBooking({ propName })} value={propName} className="bookbutton">Book</button>

                                    <button onClick={() => this.askQue({ propName })} value={propName} className="bookbutton">Ask Owner a question</button>

                                </div>
                                <div>

                                    {/* <div id="myCarousel" class="carousel slide" data-ride="carousel">

                                        <div class="carousel-inner">
                                            <div class="item active">
                                                <img src={propPhotosArray[0]}  width="50%" />
                                            </div>

                                            <div class="item">
                                                <img src={propPhotosArray[1]}   width="50%" />
                                            </div>

                                            <div class="item">
                                                <img src={propPhotosArray[2]} width="50%" />
                                            </div>  
                                        </div>

                                        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                                            <span class="glyphicon glyphicon-chevron-left"></span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                        <a class="right carousel-control" href="#myCarousel" data-slide="next">
                                            <span class="glyphicon glyphicon-chevron-right"></span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    </div> */}

                                    {/* <div class="col-lg-3"> */}
                                   {/*  <img className="imageProp" src={propPhotosArray[0]}></img>
                                    <img className="imageProp" src={propPhotosArray[1]}></img>
                                    <img className="imageProp" src={propPhotosArray[2]}></img>
                                    <img className="imageProp" src={propPhotosArray[3]}></img>
                                    <img className="imageProp" src={propPhotosArray[4]}></img> */}
                                    {/* <img className="imageProp" src={imagePreview}></img> */}
                                </div>
                            </div>
                        );
                    }
                }, this)

            )
        }
        return (
            <div>
                {redirect}

                <nav class="navbar navbar-default mynavbar">
                    <div className="container-fluid">
                        <div class="navbar-header">
                            <a class="navbarLogo" href="/mainPage">HomeAway</a>
                        </div>

                        <ul class="nav navbar-nav navbar-right navbarText">
                            <li><a href="/myTrips">Trip Boards</a></li>
                            {UserNavbar}
                            {msginbox}
                            <li class="dropdown "><a class="dropdown-toggle" data-toggle="dropdown" href="#">Help <span class="caret"></span></a>
                                <ul class="dropdown-menu mydropdown">
                                    <li><a href="#">Visit Help Center</a></li><hr></hr>
                                    <li><a href="#">Travelers</a></li>
                                    <li><a href="#">How it works</a></li>
                                    <li><a href="#">Security Center</a></li><hr></hr>
                                    <li><a href="#">Homeowners</a></li>
                                    <li><a href="#">How it Works</a></li>
                                    <li><a href="#">List Your Property</a></li>
                                    <li><a href="#">Community</a></li>
                                    <li><a href="#">Discovery Hub</a></li>
                                    <li><a href="#">Property Managers</a></li>
                                    <li><a href="#">List Your Property</a></li>
                                </ul>
                            </li>
                            <li><button class="navButton">List Your Property</button></li>
                            <img alt="HomeAway birdhouse" class="site-header-birdhouse__image" role="presentation" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"></img>
                        </ul>

                    </div>
                </nav>

                <div className="container-fluid ownerPropDetails">
                    <div className="ownerPropDashboard">
                        <h2 className="propText">Search Results: </h2>
                        {DisplayData}

                        <br></br>
                        <br></br>
                    </div>

                </div>


            </div>
        )
    }
}
export default withApollo(compose(
    graphql(handleBookingMutation, {name:"handleBookingMutation"})
)(searchResult));