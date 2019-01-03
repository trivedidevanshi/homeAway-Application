import React, { Component } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';
import { Redirect } from 'react-router';

import cookie from 'react-cookies';
import { Link } from 'react-router-dom';


import {ROOT_URL} from '../../root_url';

class myTrips extends Component {
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
            bookdateEnd: '',
            bookdateStart: '',

            searchedPropName: '',

            pageNumber: "1",
            totalProps: '',

            rdata: [{}],
            gotData: false,
            gotSearchData: false,
            gotoLocationFlag: false,

            filterStartDate:'',
            filterEndDate:''
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.handleGotoLocation = this.handleGotoLocation.bind(this);
        this.handleSearchProp = this.handleSearchProp.bind(this);
        this.submitSearchProp = this.submitSearchProp.bind(this);
        this.numberClicked = this.numberClicked.bind(this);

        this.handleFilterStartDate = this.handleFilterStartDate.bind(this);
        this.handleFilterEndDate = this.handleFilterEndDate.bind(this);
        this.handleFilter = this.handleFilter.bind(this);

    }

    //handle logout to destroy the cookie
    handleLogout = () => {
        //cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("travelerCookie");
    }
    handleFilterStartDate=(e)=>{
        this.setState({
            filterStartDate:e.target.value
        })
    }
    handleFilterEndDate=(e)=>{
        this.setState({
            filterEndDate:e.target.value
        })
    }
    handleFilter=(e)=>{
     
        e.preventDefault();
       
        const data = {
            filterStartDate : this.state.filterStartDate,
            filterEndDate: this.state.filterEndDate
        }
         console.log("--------FILTER DATES-----------");
         console.log("---------filter start date-------",this.state.filterStartDate);
         console.log("---------filter end date-------",this.state.filterEndDate);
        //set the with credentials to true
        
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            var token = localStorage.getItem('token');
            var tokenemail = localStorage.getItem('tokenemail');
    
            axios.post(`${ROOT_URL}/myTripsFilterDate/` + tokenemail, data, { headers: { Authorization: token } })

            .then(res => {
                console.log("------on filter-------", res.data.length);
                console.log("-----result length",res.data[1].propPhotos);
                this.setState({
                    rdata: [{}]
                });

                if (res.data.length > 0) {

                    let i = 0;
                    for (i = 0; i < res.data.length; i++) {
                        console.log("i: ",i);
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
                                pricePerNight: res.data[i].pricepernight,
                                bookdateStart: res.data[i].bookdatestart,
                                bookdateEnd: res.data[i].bookdateend
                            }])
                        });
                    }
                    this.setState({
                        gotData: true
                    });

                } else {
                    this.setState({
                        gotData: false
                    });
                }

            })
            .catch(err => {
                console.log("Error in userProfile get");
            });
    
        }

    componentDidMount() {
        window.scrollTo(0, 0);
        var token = localStorage.getItem('token');
        var tokenemail = localStorage.getItem('tokenemail');
        let sentdata = {
            pageNoClicked: this.state.pageNumber
        }
        axios.defaults.withCredentials = true;
        axios.post(`${ROOT_URL}/myTrips/` + tokenemail, sentdata, { headers: { Authorization: token } })

            .then(res => {
                //console.log(res.data[0].travelerbooking[0].propname);

                console.log("------on load-------", res.data);

                this.setState({
                    totalProps: res.data[1].pgNum
                });
                console.log("Total num of props of the traveler: ", this.state.totalProps);

                if (res.data[0].travelerbooking.length > 0) {

                    let i = 0;
                    for (i = 0; i < res.data[0].travelerbooking.length; i++) {
                        this.setState({
                            rdata: this.state.rdata.concat([{
                                propName: res.data[0].travelerbooking[i].propname,
                                propDescription: res.data[0].travelerbooking[i].propdescription,
                                address: res.data[0].travelerbooking[i].address,
                                city: res.data[0].travelerbooking[i].city,
                                state: res.data[0].travelerbooking[i].state,
                                country: res.data[0].travelerbooking[i].country,
                                zipcode: res.data[0].travelerbooking[i].zipcode,
                                propPhotos: res.data[0].travelerbooking[i].propPhotos,
                                bedrooms: res.data[0].travelerbooking[i].bedroom,
                                propType: res.data[0].travelerbooking[i].proptype,
                                bathroom: res.data[0].travelerbooking[i].bathrooms,
                                accomodates: res.data[0].travelerbooking[i].accomodates,
                                pricePerNight: res.data[0].travelerbooking[i].pricepernight,
                                bookdateStart: res.data[0].travelerbooking[i].bookdatestart,
                                bookdateEnd: res.data[0].travelerbooking[i].bookdateend
                            }])
                        });
                    }
                    this.setState({
                        gotData: true
                    });

                } else {
                    this.setState({
                        gotData: false
                    });
                }

            })
            .catch(err => {
                console.log("Error in userProfile get");
            });
    }

    handleGotoLocation = (e) => {
        this.setState({
            gotoLocationFlag: true
        })
    }

    handleSearchProp = (e) => {
        this.setState({
            searchedPropName: e.target.value
        })
    }
    numberClicked = (e) => {
        console.log("******((((((()))))))********", e.number);

        let sentdata = {
            pageNoClicked: e.number
        }
        console.log("*************sent data***********", sentdata);
        var token = localStorage.getItem('token');
        var tokenemail = localStorage.getItem('tokenemail');
        axios.defaults.withCredentials = true;
        axios.post(`${ROOT_URL}/myTrips/` + tokenemail, sentdata, { headers: { Authorization: token } })

            .then(res => {
                console.log("------on load page 2-------", res.data);
                this.setState({
                    rdata: [{}]
                });

                if (res.data[0].travelerbooking.length > 0) {

                    let i = 0;
                    for (i = 0; i < res.data[0].travelerbooking.length; i++) {
                        this.setState({
                            rdata: this.state.rdata.concat([{
                                propName: res.data[0].travelerbooking[i].propname,
                                propDescription: res.data[0].travelerbooking[i].propdescription,
                                address: res.data[0].travelerbooking[i].address,
                                city: res.data[0].travelerbooking[i].city,
                                state: res.data[0].travelerbooking[i].state,
                                country: res.data[0].travelerbooking[i].country,
                                zipcode: res.data[0].travelerbooking[i].zipcode,
                                propPhotos: res.data[0].travelerbooking[i].propPhotos,
                                bedrooms: res.data[0].travelerbooking[i].bedroom,
                                propType: res.data[0].travelerbooking[i].proptype,
                                bathroom: res.data[0].travelerbooking[i].bathrooms,
                                accomodates: res.data[0].travelerbooking[i].accomodates,
                                pricePerNight: res.data[0].travelerbooking[i].pricepernight,
                                bookdateStart: res.data[0].travelerbooking[i].bookdatestart,
                                bookdateEnd: res.data[0].travelerbooking[i].bookdateend
                            }])
                        });
                    }
                    this.setState({
                        gotData: true
                    });

                } else {
                    this.setState({
                        gotData: false
                    });
                }

            })
            .catch(err => {
                console.log("Error in userProfile get");
            });
    }
    submitSearchProp = (e) => {
        console.log("The searched prop name(state) is : ", this.state.searchedPropName);

        var token = localStorage.getItem('token');
        var tokenemail = localStorage.getItem('tokenemail');

        axios.defaults.withCredentials = true;
        var data = {
            searchedPropName: this.state.searchedPropName
        }
        console.log(data);
        axios.post(`${ROOT_URL}/searchMyTrips/` + tokenemail, data, { headers: { Authorization: token } })
            .then(res => {
                console.log("Length:  ", res.data.length);
                if (res.data.length > 0) {
                    this.setState({
                        rdata: [{}]
                    });

                    let i = 0;
                    for (i = 0; i < res.data.length; i++) {
                        this.setState({
                            rdata: this.state.rdata.concat([{
                                propName: res.data[i].travelerbooking.propname,
                                propDescription: res.data[i].travelerbooking.propdescription,
                                address: res.data[i].travelerbooking.address,
                                city: res.data[i].travelerbooking.city,
                                state: res.data[i].travelerbooking.state,
                                country: res.data[i].travelerbooking.country,
                                zipcode: res.data[i].travelerbooking.zipcode,
                                propPhotos: res.data[i].travelerbooking.propPhotos,
                                bedrooms: res.data[i].travelerbooking.bedroom,
                                propType: res.data[i].travelerbooking.proptype,
                                bathroom: res.data[i].travelerbooking.bathrooms,
                                accomodates: res.data[i].travelerbooking.accomodates,
                                pricePerNight: res.data[i].travelerbooking.pricepernight,
                                bookdateStart: res.data[i].travelerbooking.bookdatestart,
                                bookdateEnd: res.data[i].travelerbooking.bookdateend
                            }])
                        });
                    }
                    this.setState({
                        gotSearchData: true
                    });

                } else {
                    this.setState({
                        gotSearchData: false
                    });
                }

            })
            .catch(err => {
                console.log("Error in searched trips get");
            });

    }

    render() {
        require('./myTrips.css');
        let redirect = null;
        //if (!cookie.load('cookie')) {
        if(!localStorage.getItem("travelerCookie")){
            redirect = <Redirect to="/mainPage" />
        }
        if (this.state.gotoLocationFlag) {
            redirect = <Redirect to="/ownerLocation" />
        }
        let DisplayData = null;
        let fname = localStorage.getItem('userfirstName');
        let UserNavbar = null;
        //if (cookie.load('cookie')) {
        if(localStorage.getItem("travelerCookie")){
            UserNavbar = (
                <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">{fname} <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="/travelerInbox">Inbox</a></li>
                        <li><a href="#">My Trips</a></li>
                        <li><a href="/userProfile">My Profile</a></li>
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

        if (this.state.gotData || this.state.gotSearchData) {
            DisplayData = (

                Object.keys(this.state.rdata).map(function (key) {

                    console.log('key: ', key);  // Returns key: 1 and key: 2
                    if (key != 0) {
                        var propName = this.state.rdata[key].propName;
                        var propPhotos = this.state.rdata[key].propPhotos;
                        var bookdateStart = this.state.rdata[key].bookdateStart;
                        var bookdateEnd = this.state.rdata[key].bookdateEnd;

                        var bedrooms = this.state.rdata[key].bedrooms;
                        var propType = this.state.rdata[key].propType;
                        var bathroom = this.state.rdata[key].bathroom;
                        var accomodates = this.state.rdata[key].accomodates;
                        var pricePerNight = this.state.rdata[key].pricePerNight;

                        console.log(typeof (propPhotos));
                        var propPhotosArray = propPhotos.split(",");
                        console.log("array length " + propPhotosArray.length);

                        for (var k = 0; k < propPhotosArray.length; k++) {
                            propPhotosArray[k] = "data:image/jpg;base64, " + propPhotosArray[k];
                        }
                        //console.log(propPhotosArray[0]);

                        console.log("item : " + propName);
                        return (
                            <div className="row dashboardProps">
                                <div className="mypadding">
                                    <h3>{propName}</h3>
                                    <h4>{bedrooms} BR {propType}|{bathroom} BA | Sleeps {accomodates}</h4>
                                    <hr></hr>
                                    <h3>Booking from : {bookdateStart} to {bookdateEnd}</h3>
                                    <h4>${pricePerNight} per night</h4>

                                    <img className="imageProp" src={propPhotosArray[0]}></img>
                                    <img className="imageProp" src={propPhotosArray[1]}></img>
                                    <img className="imageProp" src={propPhotosArray[2]}></img>
                                    <img className="imageProp" src={propPhotosArray[3]}></img>
                                    <img className="imageProp" src={propPhotosArray[4]}></img>
                                </div>

                            </div>
                        );
                    }
                }, this)

            )
        } else {
            DisplayData = (

                <h3>No travel logs yet!</h3>
            )
        }
        ////////////////////////////////////////////////////////////
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(Number(this.state.totalProps) / 5); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={() => this.numberClicked({ number })}

                >
                    {number}
                </li>
            );
        });
        ////////////////////////////////////////////////////////////////
        return (
            <div>
                {redirect}

                <nav class="navbar navbar-default mynavbar">
                    <div className="container-fluid">
                        <div class="navbar-header">
                            <a class="navbarLogo" href="/mainPage">HomeAway</a>
                        </div>

                        <ul class="nav navbar-nav navbar-right navbarText">
                            <li><a href="#">Trip Boards</a></li>
                            {UserNavbar}
                            <li><a href="/travelerInbox"><span class="glyphicon glyphicon-envelope"></span></a></li>

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
                        <div class="searchBar">
                            <div>
                                <input className="searchInput" onChange={this.handleSearchProp} type="text" placeholder="Search by Property Name.." name="search" />
                                <button type="submit" onClick={this.submitSearchProp} className="searchlogo"><i class="fa fa-search "></i></button>
                                
                                <ul id="page-numbers">
                                    <h4 className="pagestext">Pages: </h4> {renderPageNumbers}
                                </ul>
                                <div className="datefilter">
                                    <h4>Date Filter:</h4>
                                    Start date:<input type="date" onChange={this.handleFilterStartDate}></input>
                                    End date:<input type="date" onChange={this.handleFilterEndDate}></input>
                                    <h4><button onClick = {this.handleFilter}>Filter</button></h4>
                                </div>
                            </div>
                        </div>
                        <h2 className="propText">Your Trips: </h2>
                        {DisplayData}
                        <br></br>
                    </div>


                </div>

            </div>
        )
    }
}
export default myTrips;