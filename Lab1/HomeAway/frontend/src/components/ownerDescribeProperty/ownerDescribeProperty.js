import React, { Component } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';
import SideBar from '../SideBar';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class ownerDescribeProperty extends Component {
    constructor(props){
        super(props);
    }
    render() {
        require('./ownerDescribeProperty.css');
        return (
            <div> 
                 
                <OwnerNavbar/>  

                <div className="container-fluid ownerPropBack">
                    <div class="row">
                        <SideBar/>
    
                        <div class="col-md-8 textBar">
                            <h1 className="textBarText">Describe Your Property</h1>
                            <button className="textBarButton">Continue</button><br></br><br></br>
                        </div>

                    </div>
                </div>

                
            </div> 
        )
    }
}



export default ownerDescribeProperty;