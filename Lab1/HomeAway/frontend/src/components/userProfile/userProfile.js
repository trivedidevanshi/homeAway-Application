import React, { Component } from 'react';
import '../travelerLogin/travelerLogin.css';
import axios from 'axios';
import cookie from 'react-cookies';

import {Link} from 'react-router-dom';
import { Redirect } from 'react-router';

class signUp extends Component {
    constructor(props){
        super(props);
        
        this.state={
            profileFirstName : "",
            profileLastName : "",
            profileAboutMe : "",
            profileCity:"",
            profileCountry:"",
            profileCompany:"",
            profileSchool:"",
            profileHomeTown:"",
            profileLanguages:"",
            profileGender:"",
            profilePhoneNumber:"", 
            profileImage:"",
            authFlag : false,
            fields: {},
            errors: {},
            description: '',
            selectedFile: '',
            dataValue:'',
            editPic:false,
            imageView : 'http://placehold.it/400x200'
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.handleGetPhoto=this.handleGetPhoto.bind(this);

        this.handleLogout = this.handleLogout.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.profileFirstNameHandler=this.profileFirstNameHandler.bind(this) ;
        this.profileLastNameHandler= this.profileLastNameHandler.bind(this) ;
        this.profileAboutMeHandler =this.profileAboutMeHandler.bind(this) ;
        this.profileCityHandler=this.profileCityHandler.bind(this) ;
        this.profileCountryHandler=this.profileCountryHandler.bind(this) ;
        this.profileCompanyHandler=this.profileCompanyHandler.bind(this);
        this.profileSchoolHandler=this.profileSchoolHandler.bind(this);
        this.profileHomeTownHandler=this.profileHomeTownHandler.bind(this);
        this.profileLanguagesHandler=this.profileLanguagesHandler.bind(this);
        this.profileGenderHandler=this.profileGenderHandler.bind(this);
        this.profilePhoneNumberHandler=this.profilePhoneNumberHandler.bind(this);
        this.handleValidation=this.handleValidation.bind(this);
        this.editPicHandler=this.editPicHandler.bind(this);
    }

    onChange = (e) => {
        if(e.target.name == 'selectedFile'){
          this.setState({
            selectedFile: e.target.files[0]
          })
        }else{
          this.setState({ [e.target.name]: e.target.value });
        }
    }
    editPicHandler = (e) => {
         
          this.setState({ editPic:true });
        
    }
  
    onSubmit = (e) => {
      e.preventDefault();
      const { description, selectedFile } = this.state;
      let formData = new FormData();
  
      formData.append('description', description);
      formData.append('selectedFile', selectedFile);
      axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/onPicSubmit', formData)
          .then((result) => {
                
          });
  
    }
  
    handleGetPhoto = (e) => {
        
        
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/getPicName')
            .then(res => {
                console.log(res.data);
                this.setState({
                    dataValue:res.data
                })
          
                console.log(this.state.dataValue);
                axios.defaults.withCredentials = true;
                axios.post('http://localhost:3001/download/'+this.state.dataValue)
                    .then(response => {
                        console.log("Image Res : ",response);
                        let imagePreview = 'data:image/jpg;base64, ' + response.data;
                        this.setState({
                            imageView: imagePreview
                        })
                    });
               
            })
            .catch(err=>{
                console.log("Error in userProfile get");
            });

            this.setState({ editPic:false });
    }
 

    componentDidMount() {
        window.scrollTo(0, 0)
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/userProfile')
            .then(res => {
                console.log(res.data[0].profileImage);
                //const persons = res.data;
                //this.setState({ persons });

                this.setState({
                    profileFirstName : res.data[0].firstName,
                    profileLastName : res.data[0].lastName,
                    profileAboutMe : res.data[0].aboutMe,
                    profileCity:res.data[0].city,
                    profileCountry:res.data[0].country,
                    profileCompany:res.data[0].company,
                    profileSchool:res.data[0].school,
                    profileHomeTown:res.data[0].hometown,
                    profileLanguages:res.data[0].languages,
                    profileGender:res.data[0].gender,
                    profilePhoneNumber:res.data[0].phoneNumber,
                    profileImage:res.data[0].profileImage,
                    
                    
                })
                axios.defaults.withCredentials = true;
                axios.post('http://localhost:3001/download/'+this.state.profileImage)
                    .then(response => {
                        console.log("Image Res : ",response);
                        let imagePreview = 'data:image/jpg;base64, ' + response.data;
                        this.setState({
                            imageView: imagePreview
                        })
                    });
            })
            .catch(err=>{
                console.log("Error in userProfile get");
            });

    }
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //profileFirstName
        if(!fields["profileFirstName"]){
           formIsValid = false;
           errors["profileFirstName"] = "profileFirstName can't be empty";
        } 
         
        //profileLastName
        if(!fields["profileLastName"]){
           formIsValid = false;
           errors["profileLastName"] = "profileLastName can't be empty";
        } 
        //profileAboutMe
        if(!fields["profileAboutMe"]){
            formIsValid = false;
            errors["profileAboutMe"] = "profileAboutMe can't be empty";
         } 
         //profileCity
        if(!fields["profileCity"]){
            formIsValid = false;
            errors["profileCity"] = "profileCity can't be empty";
         } 
         //profileCountry
        if(!fields["profileCountry"]){
            formIsValid = false;
            errors["profileCountry"] = "profileCountry can't be empty";
         } 
         //profileCompany
        if(!fields["profileCompany"]){
            formIsValid = false;
            errors["profileCompany"] = "profileCompany can't be empty";
         } 
         //profileSchool
        if(!fields["profileSchool"]){
            formIsValid = false;
            errors["profileSchool"] = "profileSchool can't be empty";
         } 
         //profileHomeTown
        if(!fields["profileHomeTown"]){
            formIsValid = false;
            errors["profileHomeTown"] = "profileHomeTown can't be empty";
         } 
         //profileLanguages
        if(!fields["profileLanguages"]){
            formIsValid = false;
            errors["profileLanguages"] = "profileLanguages can't be empty";
         } 
         //profileGender
        if(!fields["profileGender"]){
            formIsValid = false;
            errors["profileGender"] = "profileGender can't be empty";
         } 
         //profilePhoneNumber
        if(!fields["profilePhoneNumber"]){
            formIsValid = false;
            errors["profilePhoneNumber"] = "profilePhoneNumber can't be empty";
         } 
       this.setState({errors: errors});
       return formIsValid;
   }
    //profileFirstName change handler to update state variable with the text entered by the user
    profileFirstNameHandler = (e) => {
        let fields = this.state.fields;
        fields["profileFirstName"] = e.target.value;
        this.setState({fields});
        this.setState({
            profileFirstName : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    profileLastNameHandler = (e) => {
        let fields = this.state.fields;
        fields["profileLastName"] = e.target.value;        
        this.setState({fields});

        this.setState({
            profileLastName : e.target.value
        })
    }
    //profileAboutMe change handler to update state variable with the text entered by the user
    profileAboutMeHandler = (e) => {
        let fields = this.state.fields;
        fields["profileAboutMe"] = e.target.value;
        this.setState({fields});
        this.setState({
            profileAboutMe : e.target.value
        })
    }
    //profileCity change handler to update state variable with the text entered by the user
    profileCityHandler = (e) => {
        let fields = this.state.fields;
        fields["profileCity"] = e.target.value;        
        this.setState({fields});

        this.setState({
            profileCity : e.target.value
        })
    }
    //profileCountry change handler to update state variable with the text entered by the user
    profileCountryHandler = (e) => {
        let fields = this.state.fields;
        fields["profileCountry"] = e.target.value;
        this.setState({fields});
        this.setState({
            profileCountry : e.target.value
        })
    }
    //profileCompany change handler to update state variable with the text entered by the user
    profileCompanyHandler = (e) => {
        let fields = this.state.fields;
        fields["profileCompany"] = e.target.value;        
        this.setState({fields});

        this.setState({
            profileCompany : e.target.value
        })
    }
    //profileSchool change handler to update state variable with the text entered by the user
    profileSchoolHandler = (e) => {
        let fields = this.state.fields;
        fields["profileSchool"] = e.target.value;
        this.setState({fields});
        this.setState({
            profileSchool : e.target.value
        })
    }
    //profileHomeTown change handler to update state variable with the text entered by the user
    profileHomeTownHandler = (e) => {
        let fields = this.state.fields;
        fields["profileHomeTown"] = e.target.value;        
        this.setState({fields});

        this.setState({
            profileHomeTown : e.target.value
        })
    }
    //profileLanguages change handler to update state variable with the text entered by the user
    profileLanguagesHandler = (e) => {
        let fields = this.state.fields;
        fields["profileLanguages"] = e.target.value;
        this.setState({fields});
        this.setState({
            profileLanguages : e.target.value
        })
    }
    //profileGender change handler to update state variable with the text entered by the user
    profileGenderHandler = (e) => {
        let fields = this.state.fields;
        fields["profileGender"] = e.target.value;        
        this.setState({fields});

        this.setState({
            profileGender : e.target.value
        })
    }
    //profilePhoneNumber change handler to update state variable with the text entered by the user
    profilePhoneNumberHandler = (e) => {
        let fields = this.state.fields;
        fields["profilePhoneNumber"] = e.target.value;        
        this.setState({fields});

        this.setState({
            profilePhoneNumber : e.target.value
        })
    }


//submit Login handler to send a request to the node backend
submitLogin = (e) => {
    var headers = new Headers();
    var result=true;//this.handleValidation();
    //prevent page from refresh
    e.preventDefault();
   
    const data = {
        profileFirstName : this.state.profileFirstName,
        profileLastName : this.state.profileLastName,
        profileAboutMe : this.state.profileAboutMe,
        profileCity : this.state.profileCity,
        profileCountry : this.state.profileCountry,
        profileCompany : this.state.profileCompany,
        profileSchool : this.state.profileSchool,
        profileHomeTown : this.state.profileHomeTown,
        profileLanguages : this.state.profileLanguages,
        profileGender : this.state.profileGender,
        profilePhoneNumber : this.state.profilePhoneNumber,
        oORt : this.state.oORt
    }
    
    //set the with credentials to true
    if(result===true){
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/userProfile',data)
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
                console.log("noo");
            });
            
    }
    window.scrollTo(0, 0)
}

    render() {
        require('./userProfile.css');
        let UserNavbar=null;
        if(this.state.editPic){
            UserNavbar=(
                <div className="editPicture">
                <h2>Upload your photo</h2>
                <form onSubmit={this.onSubmit}>
                <label for="uploadPhotoInput" class="btn btn-default center-block picprofileButton">
                    <input type="file" id="uploadPhotoInput" name="selectedFile" onChange={this.onChange}/>
                    <strong>Browse Computer</strong>
                </label>
                <button className="picButtonsubmit" type="submit">Submit</button>
                <button className="picButtonsubmit" onClick = {this.handleGetPhoto}>Get Photo</button>
                </form>
                 
                {/* <div>
                    <img src = {this.state.imageView}/>
                </div>  */}
                </div>
            );
          }


        return (
            <div> 
                    <nav class="navbar navbar-default Profilenewnavbar">
                        <div className="container-fluid ">
                            <div class="navbar-header">
                                <a class="navbarLogoTraveler" href="#">HomeAway</a>
                            </div>
                        
                            <div class="nav navbar-nav navbar-right ProfilenavbarText navbarbirdhouse ">
                            
                                <li><a href="#">Trip Boards</a></li>
                                <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">My Account<span class="caret"></span></a>
                                    <ul class="dropdown-menu">
                                    <li><a href="#">Inbox</a></li>
                                    <li><a href="http://localhost:3000/myTrips">My Trips</a></li>
                                    <li><a href="">My Profile</a></li>
                                    <li><a href="#">Account</a></li>
                                    <li><a href="#">Owner DashBoard</a></li>
                                    <li><Link to="/mainPage" onClick = {this.handleLogout}>Logout</Link></li>
                                    </ul>
                                </li>
                                <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Help <span class="caret"></span></a>
                                    <ul class="dropdown-menu">
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
                                <li><button class="ProfilenavButton">List Your Property</button></li>
                                <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"/>
                            
                            </div>
                        </div>
                    </nav>
                
                    <div className="container-fluid profilebckground">
                        <div className="profileContainer">

                             <div className="profilePic">
                                
                                {UserNavbar}
                                <div className="dealImg">
                                    <img className="imgit" src={this.state.imageView} />
                                    <button onClick={this.editPicHandler} className="editMark"><span class="glyphicon glyphicon-pencil"></span></button>
                                </div><br></br>
                                <div>
                                    <h2 className="ProfilePicText">My Profile</h2> 
                                </div>
                            </div> 
                            

                            <div className="profileForm">
                                <form className="formType">
                                    <h3>Profile Information</h3>
                                    <div class="form-group">
                                        <input type="text" value={this.state.profileFirstName} onChange={this.profileFirstNameHandler} className="form-control profileInput" id="profileFirstName"  placeholder="First Name"></input>
                                        <span style={{color: "red"}}>{this.state.errors["profileFirstName"]}</span>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" value={this.state.profileLastName} onChange={this.profileLastNameHandler} className="form-control profileInput" id="profileLastName" placeholder="Last Name"/>
                                        <span style={{color: "red"}}>{this.state.errors["profileLastName"]}</span>
                                    </div> 
                                    <div class="form-group">
                                        <input type="text" value={this.state.profileAboutMe} onChange={this.profileAboutMeHandler} className="form-control profileInput" id="profileAboutMe" placeholder="About Me"/>
                                        <span style={{color: "red"}}>{this.state.errors["profileAboutMe"]}</span>
                                    </div> 
                                    <div class="form-group">
                                        <input type="text" value={this.state.profileCity} onChange={this.profileCityHandler} className="form-control profileInput" id="profileCity" placeholder="My City"/>
                                        <span style={{color: "red"}}>{this.state.errors["profileCity"]}</span>
                                    </div> 
                                    <div class="form-group">
                                        <input type="text" value={this.state.profileCountry} onChange={this.profileCountryHandler} className="form-control profileInput" id="profileCountry" placeholder="My Country"/>
                                        <span style={{color: "red"}}>{this.state.errors["profileCountry"]}</span>
                                    </div> 
                                    <div class="form-group">
                                        <input type="text" value={this.state.profileCompany} onChange={this.profileCompanyHandler} className="form-control profileInput" id="profileCompany" placeholder="Company"/>
                                        <span style={{color: "red"}}>{this.state.errors["profileCompany"]}</span>
                                    </div> 
                                    <div class="form-group">
                                        <input type="text" value={this.state.profileSchool} onChange={this.profileSchoolHandler} className="form-control profileInput" id="profileSchool" placeholder="School"/>
                                        <span style={{color: "red"}}>{this.state.errors["profileSchool"]}</span>
                                    </div> 
                                    <div class="form-group">
                                        <input type="text" value={this.state.profileHomeTown} onChange={this.profileHomeTownHandler} className="form-control profileInput" id="profileHomeTown" placeholder="Hometown"/>
                                        <span style={{color: "red"}}>{this.state.errors["profileHomeTown"]}</span>
                                    </div> 
                                    <div class="form-group">
                                        <input type="text" value={this.state.profileLanguages} onChange={this.profileLanguagesHandler} className="form-control profileInput" id="profileLanguages" placeholder="Languages"/>
                                        <span style={{color: "red"}}>{this.state.errors["profileLanguages"]}</span>
                                    </div> 
                                    <div class="form-group">
                                        <input type="text" value={this.state.profileGender} onChange={this.profileGenderHandler} className="form-control profileInput" id="profileGender" placeholder="Gender"/>
                                        <span style={{color: "red"}}>{this.state.errors["profileGender"]}</span>
                                    </div> 
                                    <div class="form-group">
                                        <input type="number" value={this.state.profilePhoneNumber} onChange={this .profilePhoneNumberHandler}className="form-control profileInput" id="profilePhoneNumber" placeholder="Phone Number"/>
                                        <span style={{color: "red"}}>{this.state.errors["profilePhoneNumber"]}</span>
                                    </div> 
                                    <button type="submit" onClick = {this.submitLogin} className="profileButton">Save Changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
            </div> 
        )
    }
}



export default signUp;