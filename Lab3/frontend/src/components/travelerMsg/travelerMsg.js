import React, { Component } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';
import { Redirect } from 'react-router';

import cookie from 'react-cookies';
import { Link } from 'react-router-dom';


import {ROOT_URL} from '../../root_url';

class travelerMsg extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message:"",
            authFlag:false
        }
        this.handleLogout = this.handleLogout.bind(this); 
        this.handleMessage=this.handleMessage.bind(this);
        this.submitMessage=this.submitMessage.bind(this);

    }

    //handle logout to destroy the cookie
    handleLogout = () => {
        //cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("travelerCookie");
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    handleMessage=(e)=>{
        this.setState({
            message:e.target.value
        })
    }
    submitMessage=(e)=>{

        console.log("The message to send is : ", this.state.message);
        var propname = localStorage.getItem("inboxPropName");
        let data = {
            msg : this.state.message,
            propName : propname
        }

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        var token = localStorage.getItem('token');
        var tokenemail = localStorage.getItem('tokenemail');
        axios.post(`${ROOT_URL}/travelerMsg/`+tokenemail,data,{headers:{Authorization:token}})
            .then(response => {
                console.log("response");
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("set auth flag to true.");
                    this.setState({
                        authFlag : true
                    })
                    
                }else{
                    this.setState({
                        authFlag : false
                    })
                    alert("Message not posted!");
                }
            })
            .catch(err=>{
                console.log("noo");
            });
    }
    render() {
        require('./travelerMsg.css');
        let redirect = null;
        //if (!cookie.load('cookie')) {
        if(!localStorage.getItem("travelerCookie")){
            redirect = <Redirect to="/mainPage" />
        }
        if(this.state.authFlag){
            redirect = <Redirect to="/travelerInbox" />
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
                        <li><a href="#">Inbox</a></li><hr></hr>
                        <li><a href="#">My Trips</a></li>
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

                <div>
                    <div className="thisone"> 
                        <label for="fname">Message</label><br></br>
                        <textarea rows="4" cols="50" type="text" onChange={this.handleMessage} placeholder="Your message.."/>
                        <br></br>
                        <button onClick = {this.submitMessage}>Submit</button>
                    </div>
                </div>


            </div>
        )
    }
}
export default travelerMsg;