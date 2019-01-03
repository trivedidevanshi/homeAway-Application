import React, { Component } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';
import SideBar from '../SideBar';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

import {ROOT_URL} from '../../root_url';


class ownerWelcome extends Component {
    constructor(props){
        super(props);
        this.handleGotoLocation = this.handleGotoLocation.bind(this);

        this.state = {
            gotoLocationFlag : false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }
    
    handleGotoLocation=(e)=>{
        this.setState({
            gotoLocationFlag:true
        })
    }


    render() {
        require('./ownerWelcome.css');
        let redirect = null; 
        //if(!cookie.load('ownercookie')){
        if(!localStorage.getItem("ownerCookie")){
            redirect = <Redirect to= "/mainPage"/>
        }
        if(this.state.gotoLocationFlag){
            redirect = <Redirect to= "/ownerLocation"/>
        }

        return (
            <div> 
                {redirect}
                <OwnerNavbar/>  

                <div className="container-fluid ownerPropBack">
                    <div class="row">
                        <SideBar/>
    
                        <div class="col-md-8 textBar">
                            <h1 className="textBarText">Describe Your Property</h1>
                            <button onClick = {this.handleGotoLocation} className="textBarButton">Continue</button><br></br><br></br>
                        </div>

                    </div>
                </div>

                
            </div> 
        )
    }
}
export default ownerWelcome;