import React, { Component } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';
import SideBar from '../SideBar';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

import {ROOT_URL} from '../../root_url';

class ownerDetails extends Component {
    constructor(props){
        super(props);
        
        this.state={

            country:"",
            address:"",
            city:"",
            state:"",
            zipcode:"",

            gotoLocationFlag:false,
            gotoPhotosFlag:false
        }
        this.handleCountry=this.handleCountry.bind(this);
        this.handleAddress=this.handleAddress.bind(this);
        this.handleCity=this.handleCity.bind(this);
        this.handleState=this.handleState.bind(this);
        this.handleZipcode=this.handleZipcode.bind(this);

        this.handleGotoLocation=this.handleGotoLocation.bind(this);
        this.handleGotoPhotos=this.handleGotoPhotos.bind(this);
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    handleCountry=(e)=>{
        this.setState({
            country:e.target.value
        })
    }
    handleAddress=(e)=>{
        this.setState({
            address:e.target.value
        })
    }
    handleCity=(e)=>{
        this.setState({
            city:e.target.value
        })
    }
    handleState=(e)=>{
        this.setState({
            state:e.target.value
        })
    }
    handleZipcode=(e)=>{
        this.setState({
            zipcode:e.target.value
        })
    }
    handleGotoLocation=(e)=>{
        this.setState({
            gotoLocationFlag:true
        })
    }
    handleGotoPhotos=(e)=>{

        if (typeof(Storage) !== "undefined") {
            // Store
            localStorage.setItem("country", this.state.country);
            localStorage.setItem("address", this.state.address);
            localStorage.setItem("city", this.state.city);
            localStorage.setItem("state", this.state.state);
            localStorage.setItem("zipcode", this.state.zipcode); 
           
        } else {
            console.log("Sorry, your browser does not support Web Storage...");
        }

        if(localStorage.getItem("country")=="" || localStorage.getItem("address")=="" 
        || localStorage.getItem("city")==""|| localStorage.getItem("state")==""
        || localStorage.getItem("zipcode")==""){
            this.setState({
                gotoPhotosFlag:false
            })
            alert("Please enter all the values");
        }else{
            this.setState({
                gotoPhotosFlag:true
            })
        }
    }
    render() {
        var redirect=null;
        //if(!cookie.load('ownercookie')){
        if(!localStorage.getItem("ownerCookie")){
            redirect = <Redirect to= "/mainPage"/>
        }
        if(this.state.gotoLocationFlag){
            redirect = <Redirect to= "/ownerLocation"/>
        }
        if(this.state.gotoPhotosFlag){
            redirect = <Redirect to= "/ownerPhotos"/>
        }

        require('./ownerDetails.css');
        return (
            <div> 
                {redirect}
                <OwnerNavbar/>  

                <div className="container-fluid ownerPropBack">
                    <div class="row">
                        <SideBar/>
    
                        <div class="col-md-8 ">
                        
                            <div className="myForm">
                                <form>
                                <h3>Owner Details</h3><br></br>
                                    <div class="form-group ">
                                        <input type="text" onChange={this.handleCountry} id="country"  className="myTextBox" placeholder="Country"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" onChange={this.handleAddress} id="address" className="myTextBox" placeholder="Address"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" onChange={this.handleCity} id="city" className="myTextBox" placeholder="City"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" onChange={this.handleState} id="state" className="myTextBox" placeholder="State"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" onChange={this.handleZipcode} id="zipcode" className="myTextBox" placeholder="Zip Code"/>
                                    </div>
                                    <div className="form-group buttonForm1">
                                        <button onClick = {this.handleGotoLocation} className="buttonForm" type="submit">Back</button>
                                        <button onClick = {this.handleGotoPhotos} className="buttonForm" type="submit">Next</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>

                
            </div> 
        )
    }
}

export default ownerDetails;