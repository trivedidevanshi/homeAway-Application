import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class LoginNavBar extends Component {
    constructor(props){
        super(props);
    }
    render() {
        require('./loginNavBar.css');
        return (
            <div>            
                <nav class="navbar navbar-default mynewnavbar">
                <div className="container-fluid navbarnewcontainer ">
                    <div class="navbar-header">
                        <a class="navbarLogoTraveler " href="/mainPage">HomeAway</a>
                    </div>
                        
                    <div class="nav navbar-nav navbar-right navbarbirdhouse">
                        <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"/>
                    </div>
                </div>
            </nav>  
            </div>

        )
    }
}
export default LoginNavBar;




