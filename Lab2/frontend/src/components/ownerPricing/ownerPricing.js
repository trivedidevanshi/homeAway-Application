import React, { Component } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';
import SideBar from '../SideBar';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';


import {ROOT_URL} from '../../root_url';

class ownerPricing extends Component {
    constructor(props){
        super(props);
        
        this.state={
            headline:"",
            propDescription:"",
            propType:"",
            bedroom:"",
            accomodates:"",
            bathrooms:"",

            country:"",
            address:"",
            city:"",
            state:"",
            zipcode:"",

            propPhotos:"",

            availableStart:"",
            availableEnd:"",
            pricePerNight:"",

            gotoPhotosFlag:false
        }
        this.handleAvailableStart=this.handleAvailableStart.bind(this);
        this.handleAvailableEnd=this.handleAvailableEnd.bind(this);
        this.handlePricePerNight=this.handlePricePerNight.bind(this);
        this.handleGotoPhotos=this.handleGotoPhotos.bind(this);
        this.handleSave=this.handleSave.bind(this);
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    handleAvailableStart=(e)=>{
        this.setState({
            availableStart:e.target.value
        })
    }
    handleAvailableEnd=(e)=>{
        this.setState({
            availableEnd:e.target.value
        })
    }
    handlePricePerNight=(e)=>{
        this.setState({
            pricePerNight:e.target.value
        })
    }
    handleSave=(e)=>{
    
    var headers = new Headers();
    e.preventDefault();
   
    const data = {
            headline:localStorage.getItem("headline"),
            propDescription:localStorage.getItem("propDescription"),
            propType:localStorage.getItem("propType"),
            bedroom:localStorage.getItem("bedroom"),
            accomodates:localStorage.getItem("accomodates"),
            bathrooms:localStorage.getItem("bathrooms"),

            propPhotos:localStorage.getItem("ownerImage"),

            country:localStorage.getItem("country"),
            address:localStorage.getItem("address"),
            city:localStorage.getItem("city"),
            state:localStorage.getItem("state"),
            zipcode:localStorage.getItem("zipcode"),

            availableStart:this.state.availableStart,
            availableEnd:this.state.availableEnd,
            pricePerNight:this.state.pricePerNight
      
    }
     
    //set the with credentials to true
    
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        var token = localStorage.getItem('token');
        var tokenemail = localStorage.getItem('tokenemail');
        console.log("-------available start-----------", this.state.availableStart);
        if(this.state.availableStart=="" || this.state.availableStart=="" 
        || this.state.pricePerNight==""){
            alert("Please enter all the values");
        }else{
             
        axios.post(`${ROOT_URL}/ownerPricing/`+tokenemail,data,{headers:{Authorization:token}})
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                    localStorage.removeItem("headline");
                    localStorage.removeItem("propDescription");
                    localStorage.removeItem("propType");
                    localStorage.removeItem("bedroom");
                    localStorage.removeItem("accomodates");
                    localStorage.removeItem("bathrooms");

                    localStorage.removeItem("ownerImage");

                    localStorage.removeItem("country");
                    localStorage.removeItem("address");
                    localStorage.removeItem("city");
                    localStorage.removeItem("state");
                    localStorage.removeItem("zipcode");

                    
                }else{
                    this.setState({
                        authFlag : false
                    })
                    alert("Property not posted!");
                }
            })
            .catch(err=>{
                console.log("noo");
            });
        
        }
    window.scrollTo(0, 0)

    }
    handleGotoPhotos=(e)=>{
        this.setState({
            gotoPhotosFlag:true
        })
    }
    render() {
        var redirect=null;
        //if(!cookie.load('ownercookie')){
        if(!localStorage.getItem("ownerCookie")){
            redirect = <Redirect to= "/mainPage"/>
        }
        if(this.state.authFlag==true){
            redirect = <Redirect to= "/ownerPropertyDashboard"/>
            alert("Property Posted!");
        }
       
        if(this.state.gotoPhotosFlag){
            redirect = <Redirect to= "/ownerPhotos"/>
        }
        require('./ownerPricing.css');
        return (
            <div> 
                 
                 {redirect}
                <OwnerNavbar/>  

                <div className="container-fluid ownerPropBack">
                    <div class="row">
                        <SideBar/>
    
                        <div class="col-md-8 ">
                            <div className="Availability">
                                    <h1>Availability</h1>
                                    <h5>Already know when you would like your property to be available?<br>
                                    </br>You can also make changes after publishing your listing.</h5>
                            </div>
                            <div className="myForm">
                                
                                <form>
                                    <div class="form-group ">
                                        <h4 className="textcenter">Select a starting point for setting up your availability</h4>
                                    </div>
                                     
                                    <div className="form-group">
                                        <div className="row">
                                            <div class="col-md-6 alignCenter">
                                                <button className="alignCenter getborder" type="submit">
                                                    <h3>Block out certain dates</h3><br></br>
                                                    <img src="//csvcus.homeaway.com/rsrcs/82/B43CA9FA2FB92C9358A6D7F3CA4308-blockOut_selected.svg" height="150" width="150"></img>
                                                    <h4>Perfect for full time rental properties or super flexible owners</h4>
                                                
                                                </button>
                                            </div>
                                            <div class="col-md-6 alignCenter ">
                                           
                                               <button className="alignCenter getborder" type="submit">
                                                    <h3>Select the dates your property will be available</h3>
                                                    <img src="//csvcus.homeaway.com/rsrcs/23/5A8B7AD986CED6F9D45A050A5AC8F0-selectDates_selected.svg" height="150" width="150"></img>
                                                    <h4>Perfect for full time rental properties or super flexible owners</h4>
                                                   
                                                </button>
                                      
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="Availability" >
                                <h1>Availability dates:</h1>
                                <h4>Start Date:</h4><input onChange={this.handleAvailableStart} className="availabeldates" type="date" name="availableStart" ></input><br></br>
                                <h4>End Date:</h4><input onChange={this.handleAvailableEnd} className="availabeldates" type="date" name="availableEnd" ></input><br></br><br></br>
                                <h2>Price Per Night:</h2><input onChange={this.handlePricePerNight} className="availabeldates" type="number" name="pricePerNght" ></input>
                            </div>
                            <div className="form-group Availability">
                                <button onClick = {this.handleGotoPhotos} className="buttonForm" type="submit">back</button>
                                <button onClick = {this.handleSave} className="buttonForm1" type="submit">Save</button>
                            </div>
                        </div>

                    </div>
                </div>

                
            </div> 
        )
    }
}

export default ownerPricing;