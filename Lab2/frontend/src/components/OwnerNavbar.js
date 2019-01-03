import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class OwnerNavbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        //cookie.remove('ownercookie', { path: '/' })
        localStorage.removeItem("ownerCookie")
    }
    render() {
        var fname=localStorage.getItem("ownerEmailNavbar");
        require('./OwnerNavbar.css');
        return (
            <div>
                <nav class="navbar navbar-default myNavbar">
                    <div class="container-fluid">
                        <div className="hamburgerNav">
                            <div className="hamburger1"></div>
                            <div className="hamburger2"></div>
                            <div className="hamburger3"></div>
                        </div>
                        <div class="navbar-header">
                            <a class="navbar-brand" href="/mainPage">HomeAway</a>
                        </div>

                        <ul class="nav navbar-nav navbar-right">
                            <li><a>Address</a></li>

                            <li class="dropdown "><a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="glyphicon glyphicon-user"></span>{fname}<span class="caret"></span></a>
                                <ul class="dropdown-menu mydropdown"> 
                                    <li><a href="/ownerPropertyDashboard">Property Details</a></li>
                                    
                                    <li><a href="/ownerWelcome">Add new property</a></li>
                                    <li><Link to="/mainPage" onClick={this.handleLogout}>Sign out</Link></li>
                                </ul>
                            </li>
                            <li><a href="/ownerInbox"><span class="glyphicon glyphicon-envelope"></span></a></li>

                            <li><a href="#"><span class="glyphicon glyphicon-bell"></span></a></li>

                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default OwnerNavbar;