import React, { Component } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';
import { Redirect } from 'react-router';

import cookie from 'react-cookies';
import { Link } from 'react-router-dom';


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

        console.log("The data being sent to the backend is : " + JSON.stringify(data));
        var token = localStorage.getItem('token');
        var tokenemail = localStorage.getItem('tokenemail');

        axios.defaults.withCredentials = true;
        axios.post(`${ROOT_URL}/handleBooking/`+tokenemail, data,{headers:{Authorization:token}})
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("Success !!!!!!!");
                    this.setState({
                        flag: true,
                    })
                    alert("The Property has been booked!! Get ready and pack your bags!!");
                }
                else {
                    this.setState({
                        flag: false
                    })
                }
            })
            .catch(err => {
                alert("Cannot book property due to some error");
            });
    }

    askQue = (e) => {
        //  console.log("Book Property : ", e.target.value);
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
        var token = localStorage.getItem('token');
        axios.defaults.withCredentials = true;
         
        axios.get(`${ROOT_URL}/getSearchResult`,{headers:{Authorization:token}})
            .then(res => {

                console.log("The received data is : ",res.data[0]);
                let i = 0;
                for (i = 0; i < res.data.length; i++) {
                    this.setState({
                        rdata: this.state.rdata.concat([{
                            propName: res.data[i].propname,
                            propDescription: res.data[i].propdescription,
                            address: res.data[i].address,
                            city: res.data[i].city,
                            state: res.data[i].state,
                            country: res.data[i].country,
                            zipcode: res.data[i].zipcode,
                            propPhotos: res.data[i].propPhotos,
                            bedrooms: res.data[i].bedroom,
                            propType: res.data[i].proptype,
                            bathroom: res.data[i].bathrooms,
                            accomodates: res.data[i].accomodates,
                            pricePerNight: res.data[i].pricepernight
                        }])
                    });
                }
                this.setState({
                    gotData: true
                }); 
            })
            .catch(err => {
                console.log("Error in Search Results");
            });
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

                        console.log(typeof (propPhotos));
                        propPhotosArray = propPhotos.split(",");
                        console.log("array length " + propPhotosArray.length);

                        for (var k = 0; k < propPhotosArray.length; k++) {
                            propPhotosArray[k] = "data:image/jpg;base64, " + propPhotosArray[k];
                        }
                        console.log("propPhotosArray[0]: " + propPhotosArray[0]);
                        console.log("propPhotosArray[1]: " + propPhotosArray[1]);
                        console.log("propPhotosArray[2]: " + propPhotosArray[2]);

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
                                    <img className="imageProp" src={propPhotosArray[0]}></img>
                                    <img className="imageProp" src={propPhotosArray[1]}></img>
                                    <img className="imageProp" src={propPhotosArray[2]}></img>
                                    <img className="imageProp" src={propPhotosArray[3]}></img>
                                    <img className="imageProp" src={propPhotosArray[4]}></img>
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
export default searchResult;