import React, { Component } from 'react';
import './mainPage.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import {ROOT_URL} from '../../root_url';

class mainPage extends Component {
  constructor(props){
    super(props);
    this.state={
      destination:'',
      arrivalDate:'',
      departDate:'',
      guests:'',
      fields: {},
      errors: {},
      authFlag:false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.destinationHandler=this.destinationHandler.bind(this);
    this.arrivalDateHandler=this.arrivalDateHandler.bind(this);
    this.departDateHandler=this.departDateHandler.bind(this);
    this.guestsHandler=this.guestsHandler.bind(this);
    this.handleValidation=this.handleValidation.bind(this);
  }

  //handle logout to destroy the cookie
  handleLogout = () => {
    //cookie.remove('cookie', { path: '/' })
    localStorage.removeItem("travelerCookie");
  }

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //destination
    if(!fields["destination"]){
       formIsValid = false;
       errors["destination"] = "destination can't be empty";
    } 
     
    //arrivalDate
    if(!fields["arrivalDate"]){
       formIsValid = false;
       errors["arrivalDate"] = "arrivalDate can't be empty";
    } 
    //departDate
    if(!fields["departDate"]){
        formIsValid = false;
        errors["departDate"] = "departDate can't be empty";
     } 
     //guests
    if(!fields["guests"]){
        formIsValid = false;
        errors["guests"] = "guests can't be empty";
     } 
     
    this.setState({errors: errors});
    return formIsValid;
  }


  //profileGender change handler to update state variable with the text entered by the user
  destinationHandler = (e) => {
    let fields = this.state.fields;
    fields["destination"] = e.target.value;        
    this.setState({fields});

    this.setState({
        destination : e.target.value
    })
}
//ARRIVALDATE change handler to update state variable with the text entered by the user
arrivalDateHandler = (e) => {
  let fields = this.state.fields;
  fields["arrivalDate"] = e.target.value;        
  this.setState({fields});

  this.setState({
      arrivalDate : e.target.value
  })
}
//departDate change handler to update state variable with the text entered by the user
departDateHandler = (e) => {
  let fields = this.state.fields;
  fields["departDate"] = e.target.value;        
  this.setState({fields});

  this.setState({
      departDate : e.target.value
  })
}
//guests change handler to update state variable with the text entered by the user
guestsHandler = (e) => {
  let fields = this.state.fields;
  fields["guests"] = e.target.value;        
  this.setState({fields});

  this.setState({
      guests : e.target.value
  })
}

  //search handler to send a request to the node backend
    onSearch = (e) => {
      var headers = new Headers();
      var result=this.handleValidation();
      e.preventDefault();
      //if(cookie.load('cookie')){
      if(localStorage.getItem("travelerCookie")){
        const data = {
      
            destination:this.state.destination,
            arrivalDate:this.state.arrivalDate,
            departDate:this.state.departDate,
            guests:this.state.guests
        }
        
        //set the with credentials to true
        if(result===true){
          var token = localStorage.getItem('token');
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post(`${ROOT_URL}/mainPage`,data,{headers:{Authorization:token}})
                .then(response => {
                  
                    console.log("Status Code : ",response.status);
                    if(response.status === 200){
                       
                        this.setState({
                            authFlag : true
                        })
                    }else{
                        this.setState({
                            authFlag : false
                        })
                    }
                })
                .catch(err=>{
                  alert("No properties for search values. Please enter valid location and dates");
                       
                });
                
        }
      }else{
        alert("Please Login to search");
      }
      window.scrollTo(0, 0)
    }
  
     render() {
        
          console.log("-------------------------------");
          console.log(this.props.login);
          console.log(this.props.login); 
          console.log(this.props.login.firstName); 
          console.log("-------------------------------");
       
      //let fname=this.props.login.firstName;
      let fname = localStorage.getItem('userfirstName');
      let UserNavbar=null;
      let msginbox = null;
      var redirect=null;
      if(this.state.authFlag){
        redirect = <Redirect to= "/searchResult"/>
  
      }

      //if(cookie.load('cookie')){
        if(localStorage.getItem("travelerCookie")){
          console.log(localStorage.getItem("travelerCookie"));
        msginbox =(
          <li><a href="/travelerInbox"><span class="glyphicon glyphicon-envelope"></span></a></li>
        );
        UserNavbar=(
          
          <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">{fname} <span class="caret"></span></a>
            <ul class="dropdown-menu">
                <li><a href="/travelerInbox">Inbox</a></li><hr></hr>
                <li><a href="/myTrips">My Trips</a></li>
                <li><a href="/userProfile">My Profile</a></li>
                <li><a href="#">Account</a></li><hr></hr>
                <li><a href="#">Owner Dashboard</a></li>
                <li><Link to="/mainPage" onClick={this.handleLogout}>Logout</Link></li>
              </ul>
          </li>
        );
      }
      else{
        UserNavbar=(
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
            <header role="banner">
              <div className="backImage">
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
    
                <div className="container-fluid">
                  <div className="jumbotron myjumbotron">
                    <div className="jumbotronContent">
                      <span className="myfont">Book beach houses, cabins,</span><br></br>
                      <span className="myfont">condos and more, worldwide</span><br></br><br></br>
                      <div className="jumbotronSearch">
                            <input onChange={this.destinationHandler} className="mainInputs" type="text" name="destination" placeholder="Destination" ></input>
                            <span style={{color: "red"}}>{this.state.errors["destination"]}</span>
                                    
                            <input onChange={this.arrivalDateHandler} className="mainInputs" type="date" name="arrivalDate" ></input>
                            <span style={{color: "red"}}>{this.state.errors["arrivalDate"]}</span>
                                    
                            <input onChange={this.departDateHandler} className="mainInputs" type="date" name="departDate" ></input>
                            <span style={{color: "red"}}>{this.state.errors["departDate"]}</span>
                                    
                            <input onChange={this.guestsHandler} className="mainInputs" type="text" name="guests" placeholder="Guests" ></input>
                            <span style={{color: "red"}}>{this.state.errors["guests"]}</span>
                                    
                            <button onClick={this.onSearch} class="navSearchButton">Search</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                    <div class="col-sm-4 mainPageColumns">Your whole vacation starts here<br></br>
                    Choose a rental from the world's best selection</div>
                    <div class="col-sm-4 mainPageColumns">Book and stay with confidence<br></br>
                    Secure payments, peace of mind</div>
                    <div class="col-sm-4 mainPageColumns">Your vacation your way<br></br>
                    More space, more privacy, no compromises</div>
                </div>

              </div>
            </header>

    
          </div> 
        )
    }
}
function mapStateToProps(state) {
  return { login: state.login };
}

export default connect(mapStateToProps)(mainPage);
/*
export default mainPage;*/