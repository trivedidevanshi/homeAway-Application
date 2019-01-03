import React, { Component } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';
import { Redirect } from 'react-router';

import cookie from 'react-cookies'; 
import {Link} from 'react-router-dom';

class searchResult extends Component {
    constructor(props){
        super(props);

        this.state = {
            propName:'',
            propDescription:'',
            address:'',
            city:'',
            state:'',
            country:'',
            zipcode:'',
            propPhotos:'',

            bedrooms:'',
            propType:'',
            bathroom:'',
            accomodates:'',
            pricePerNight:'',

            rdata: [{}],
            gotData:false,
            gotoLocationFlag : false,
            flag:false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.handleBooking = this.handleBooking.bind(this);
        this.handleGotoLocation = this.handleGotoLocation.bind(this);
     
    }

    handleBooking = (e) =>{
      //  console.log("Book Property : ", e.target.value);
        const data = {
            bookpropertyname : e
        }
        
        console.log("The data being sent to the backend is : "+JSON.stringify(data));
        axios.defaults.withCredentials = true;
          axios.post('http://localhost:3001/handleBooking',data)
              .then(response => {
                  console.log("Status Code : ",response.status);
                  if(response.status === 200){
                      console.log("Success !!!!!!!");
                      this.setState({
                          flag : true,
                      })
                  }
                  else{
                      this.setState({
                          flag : false
                      })
                  }
              })
              .catch(err =>{
                  alert("Cannot book property due to some error");
              });
    }


 //handle logout to destroy the cookie
 handleLogout = () => {
    cookie.remove('cookie', { path: '/' })
  }
    componentDidMount() {
        window.scrollTo(0, 0);
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/getSearchResult')
            .then(res => {
                console.log(res.data);
                //console.log(this.state.rdata[0].name);
                let i=0;    
                for(i=0;i<res.data.length;i++){
                    this.setState({
                        rdata: this.state.rdata.concat([{ propName: res.data[i].propName, 
                            propDescription:res.data[i].propDescription,
                            address:res.data[i].address,
                            city:res.data[i].city,
                            state:res.data[i].state,
                            country:res.data[i].country,
                            zipcode:res.data[i].zipcode,
                            propPhotos:res.data[i].propPhotos,
                            bedrooms:res.data[i].bedrooms,
                            propType:res.data[i].propType,
                            bathroom:res.data[i].bathroom,
                            accomodates:res.data[i].accomodates,
                            pricePerNight:res.data[i].pricePerNight
                        }])
                    });
                }
                this.setState({
                    gotData:true
                });
                console.log(this.state.rdata[1].propDescription);
                console.log(this.state.rdata[2].propName);
            })
            .catch(err=>{
                console.log("Error in userProfile get");
            });
    }
    
    handleGotoLocation=(e)=>{
        this.setState({
            gotoLocationFlag:true
        })
    }

    render() {
        require('./searchResult.css');
        let redirect = null; 
        if(this.state.gotoLocationFlag){
            redirect = <Redirect to= "/ownerLocation"/>
        }
       /* if(this.state.flag){
            redirect = <Redirect to= "/mainPage"/>
        }*/
        let DisplayData=null;

        let UserNavbar=null;
      if(cookie.load('cookie')){
        UserNavbar=(
          <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Username <span class="caret"></span></a>
            <ul class="dropdown-menu">
                <li><a href="#">Inbox</a></li><hr></hr>
                <li><a href="http://localhost:3000/myTrips">My Trips</a></li>
                <li><a href="http://localhost:3000/userProfile">My Profile</a></li>
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
              <li><a href="http://localhost:3000/travelerLogin">Traveler Login</a></li>
              <li><a href="http://localhost:3000/ownerLogin">Owner Login</a></li>
            </ul>
          </li>
        );
      }

        if(this.state.gotData){
            DisplayData=( 
            
            Object.keys(this.state.rdata).map(function (key) {
            
                 console.log('key: ', key);  // Returns key: 1 and key: 2
                 if(key!=0){
                 var propName = this.state.rdata[key].propName;
                 /* var propDescription = this.state.rdata[key].propDescription;
                 var address = this.state.rdata[key].address;
                 var city = this.state.rdata[key].city;
                 var state = this.state.rdata[key].state;
                 var country = this.state.rdata[key].country;
                 var zipcode = this.state.rdata[key].zipcode; */
                 var propPhotos = this.state.rdata[key].propPhotos;

                 
                 var bedrooms=this.state.rdata[key].bedrooms;
                 var propType=this.state.rdata[key].propType;
                 var bathroom=this.state.rdata[key].bathroom;
                 var accomodates=this.state.rdata[key].accomodates;
                 var pricePerNight=this.state.rdata[key].pricePerNight;

                 let imagePreview = 'data:image/jpg;base64, ' + propPhotos;

                 console.log("item : "+propName);
                 return (
                     <div className="row dashboardProps">
                        <div class="col-lg-3">
                            
                            <img className="imageProp" src={imagePreview}></img>
                        </div>
                        <div class="col-lg-9" >
                            <h3>{propName}</h3>
                            <h4>{bedrooms} BR {propType}|{bathroom} BA | Sleeps {accomodates}</h4>
                            <br></br>
                            <h2>${pricePerNight} per night</h2>
                            <button onClick = {()=>this.handleBooking({propName})} value= {propName} className="bookbutton">Book</button>
                       
                        </div>
                        
                     </div>
                     );
                 }
                 }, this)

            )
        }
        return (
            <div> 
                {redirect}
                
                <nav class="navbar navbar-default mynavbar">
                  <div className="container-fluid">
                    <div class="navbar-header">
                      <a class="navbarLogo" href="#">HomeAway</a>
                    </div>
          
                    <ul class="nav navbar-nav navbar-right navbarText">
                      <li><a href="#">Trip Boards</a></li>
                      {UserNavbar}
                  
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
                    <h2 className="propText">Search Results: </h2>
                     {DisplayData} 
                        <br></br>
                        <br></br>
                    </div>
                    
                </div>

                
            </div> 
        )
    }
}
export default searchResult;