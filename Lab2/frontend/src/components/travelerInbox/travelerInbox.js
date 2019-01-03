import React, { Component } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';
import { Redirect } from 'react-router';

import cookie from 'react-cookies';
import { Link } from 'react-router-dom';


import {ROOT_URL} from '../../root_url';


class travelerInbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rdata: [{}],
            
            gotData: false
        }
        this.handleLogout = this.handleLogout.bind(this); 

    }

    //handle logout to destroy the cookie
    handleLogout = () => {
        //cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("travelerCookie");
    }
    componentDidMount() {
        window.scrollTo(0, 0);

        var token = localStorage.getItem('token');
        
        var tokenemail = localStorage.getItem('tokenemail');

        axios.defaults.withCredentials = true;
        axios.get(`${ROOT_URL}/gettravelerMessage/`+tokenemail,{headers:{Authorization:token}})
            .then(res => {
                console.log("The received data is : ",res.data[0]);
                let i = 0;
                for (i = 0; i < res.data.length; i++) {
                    this.setState({
                        rdata: this.state.rdata.concat([{
                            propName: res.data[i].propName,
                            msg: res.data[i].msg,
                            ownerReply: res.data[i].ownerReply
                        }])
                    });
                }
                if(res.data.length>0){
                    this.setState({
                        gotData: true
                    }); 
                }
                else{
                    this.setState({
                        gotData: false
                    }); 
                }
            })
            .catch(err => {
                console.log("Error in traveler Messages");
            });

    }
 
    render() {
        require('./travelerInbox.css');
        let redirect = null;
        //if (!cookie.load('cookie')) {
        if(!localStorage.getItem("travelerCookie")){
            redirect = <Redirect to="/mainPage" />
        }
        let fname = localStorage.getItem('userfirstName');
        let UserNavbar = null;
        let msginbox = null;
        //if (cookie.load('cookie')) {
        if(localStorage.getItem("travelerCookie")){
            msginbox =(
                <li><a href="/travelerInbox"><span class="glyphicon glyphicon-envelope"></span></a></li>
              );
            UserNavbar = (
                <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">{fname} <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="/travelerInbox">Inbox</a></li> 
                        <li><a href="/myTrips">My Trips</a></li>
                        <li><a href="/userProfile">My Profile</a></li>
                        {/* <li><a href="#">Account</a></li><hr></hr>
                        <li><a href="#">Owner Dashboard</a></li> */}
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
        var DisplayData=null;
        var msgReply = null;
        if (this.state.gotData) {
            DisplayData = (

                Object.keys(this.state.rdata).map(function (key) {

                    console.log('key: ', key);  // Returns key: 1 and key: 2
                    if (key != 0) {
                        var propName = this.state.rdata[key].propName;
                        var msg = this.state.rdata[key].msg; 
                        var ownerReply = this.state.rdata[key].ownerReply;
 
                        if(ownerReply != undefined){
                            msgReply=(
                                <h4 className="ownerResponse">Owner's Response: {ownerReply}</h4>
                            )
                        }else{
                            msgReply=(
                                <p></p>
                            )
                        }

                        return (
                            <div className="row dashboardProps">

                                <div className="info"> 
                                    <h3>Property Name: {propName}</h3>
                                    <h4>Message: {msg}</h4>
                                    {msgReply}
                                </div>  
                            </div>
                        );
                    }
                }, this)

            )
        }else{
            DisplayData=(
                <div>No messages yet!</div>
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
                        <h2 className="propText">Your Inbox: </h2>
                        {DisplayData}

                        <br></br>
                        <br></br>
                    </div>

                </div>

            </div>
        )
    }
}
export default travelerInbox;