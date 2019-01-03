import React, { Component } from 'react';
import '../travelerLogin/travelerLogin.css';
import axios from 'axios';
import cookie from 'react-cookies';

import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';


import {ROOT_URL} from '../../root_url';


import { graphql, compose } from 'react-apollo';
import { withApollo } from 'react-apollo'
import { getUserProfileQuery } from '../../queries/queries'
 
import { postUserProfileMutation } from '../../mutation/mutations';


class signUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profileFirstName: "",
            profileLastName: "",
            profileAboutMe: "",
            profileCity: "",
            profileCountry: "",
            profileCompany: "",
            profileSchool: "",
            profileHomeTown: "",
            profileLanguages: "",
            profileGender: "",
            profilePhoneNumber: "",
            profileImage: "",
            authFlag: false,
            fields: {},
            errors: {},
            description: '',
            selectedFile: '',
            dataValue: '',
            editPic: false,
            imageView: 'http://placehold.it/400x200'
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleGetPhoto = this.handleGetPhoto.bind(this);

        this.handleLogout = this.handleLogout.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.profileFirstNameHandler = this.profileFirstNameHandler.bind(this);
        this.profileLastNameHandler = this.profileLastNameHandler.bind(this);
        this.profileAboutMeHandler = this.profileAboutMeHandler.bind(this);
        this.profileCityHandler = this.profileCityHandler.bind(this);
        this.profileCountryHandler = this.profileCountryHandler.bind(this);
        this.profileCompanyHandler = this.profileCompanyHandler.bind(this);
        this.profileSchoolHandler = this.profileSchoolHandler.bind(this);
        this.profileHomeTownHandler = this.profileHomeTownHandler.bind(this);
        this.profileLanguagesHandler = this.profileLanguagesHandler.bind(this);
        this.profileGenderHandler = this.profileGenderHandler.bind(this);
        this.profilePhoneNumberHandler = this.profilePhoneNumberHandler.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.editPicHandler = this.editPicHandler.bind(this);
    }

    onChange = (e) => {
        if (e.target.name == 'selectedFile') {
            this.setState({
                selectedFile: e.target.files[0]
            })
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }
    editPicHandler = (e) => {

        this.setState({ editPic: true });

    }

    onSubmit = (e) => {
        e.preventDefault();
        const { description, selectedFile } = this.state;
        let formData = new FormData();

        var token = localStorage.getItem('token');
        var tokenemail = localStorage.getItem('tokenemail');

        formData.append('description', description);
        formData.append('selectedFile', selectedFile);
        axios.defaults.withCredentials = true;
        axios.post(`${ROOT_URL}/onPicSubmit/`+tokenemail, formData,{headers:{Authorization:token}})
            .then((result) => {
                console.log(result);
            });
    }

    handleGetPhoto = (e) => {
        var token = localStorage.getItem('token');
        var tokenemail = localStorage.getItem('tokenemail');

        axios.defaults.withCredentials = true;
        axios.get(`${ROOT_URL}/getPicName/`+tokenemail,{headers:{Authorization:token}})
            .then(res => {
                console.log(res.data);
                this.setState({
                    dataValue: res.data
                })

                console.log("Data Value: " + this.state.dataValue);
                axios.defaults.withCredentials = true;
                axios.post(`${ROOT_URL}/download/` + this.state.dataValue)
                    .then(response => {
                        console.log("Image Res : ", response);
                        let imagePreview = 'data:image/jpg;base64, ' + response.data;
                        this.setState({
                            imageView: imagePreview
                        })
                    });

            })
            .catch(err => {
                console.log("Error in userProfile get");
            });

        this.setState({ editPic: false });
    }

    componentDidMount() {
        window.scrollTo(0, 0) 
        var tokenemail = localStorage.getItem('tokenemail');
        console.log("___________the token email is _______\n"+tokenemail);

        this.props.client.query({
            query: getUserProfileQuery,
            variables: {
                email: tokenemail
            }
        }).then(res => {
            console.log("The response is : ", res);
            
            this.setState({
                profileFirstName: res.data.getUserProfileQuery.firstName,
                profileLastName: res.data.getUserProfileQuery.lastName,
                profileAboutMe: res.data.getUserProfileQuery.aboutme,
                profileCity: res.data.getUserProfileQuery.city,
                profileCountry: res.data.getUserProfileQuery.country,
                profileCompany: res.data.getUserProfileQuery.company,
                profileSchool: res.data.getUserProfileQuery.school,
                profileHomeTown: res.data.getUserProfileQuery.hometown,
                profileLanguages: res.data.getUserProfileQuery.languages,
                profileGender: res.data.getUserProfileQuery.gender,
                profilePhoneNumber: res.data.getUserProfileQuery.phonenumber,
                profileImage: res.data.getUserProfileQuery.profileimage

            })

        }).catch(err => {
            console.log("the err is : ", err);
            
        })

        /*axios.get(`${ROOT_URL}/userProfile/`+tokenemail,{headers:{Authorization:token}})
            .then(res => {
                // console.log(res.data[0].profileImage);
                console.log("The received data is : " + JSON.stringify(res.data.email));
                //const persons = res.data;
                //this.setState({ persons });

                this.setState({
                    profileFirstName: res.data.firstName,
                    profileLastName: res.data.lastName,
                    profileAboutMe: res.data.aboutme,
                    profileCity: res.data.city,
                    profileCountry: res.data.country,
                    profileCompany: res.data.company,
                    profileSchool: res.data.school,
                    profileHomeTown: res.data.hometown,
                    profileLanguages: res.data.languages,
                    profileGender: res.data.gender,
                    profilePhoneNumber: res.data.phonenumber,
                    profileImage: res.data.profileimage

                })
                axios.defaults.withCredentials = true;
                console.log("profileimage: "+this.state.profileImage);
                if(this.state.profileImage != undefined){
                axios.post(`${ROOT_URL}/download/` + this.state.profileImage)
                    .then(response => {
                        console.log("Image Res : ", response);
                        let imagePreview = 'data:image/jpg;base64, ' + response.data;
                        this.setState({
                            imageView: imagePreview
                        })
                    });
                }
            })
            .catch(err => {
                console.log("Error in userProfile get");
            });*/

    }
    handleLogout = () => {
        //cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("travelerCookie");
    }
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //profileFirstName
        if (!fields["profileFirstName"]) {
            formIsValid = false;
            errors["profileFirstName"] = "profileFirstName can't be empty";
        }

        //profileLastName
        if (!fields["profileLastName"]) {
            formIsValid = false;
            errors["profileLastName"] = "profileLastName can't be empty";
        }
        //profileAboutMe
        if (!fields["profileAboutMe"]) {
            formIsValid = false;
            errors["profileAboutMe"] = "profileAboutMe can't be empty";
        }
        //profileCity
        if (!fields["profileCity"]) {
            formIsValid = false;
            errors["profileCity"] = "profileCity can't be empty";
        }
        //profileCountry
        if (!fields["profileCountry"]) {
            formIsValid = false;
            errors["profileCountry"] = "profileCountry can't be empty";
        }
        //profileCompany
        if (!fields["profileCompany"]) {
            formIsValid = false;
            errors["profileCompany"] = "profileCompany can't be empty";
        }
        //profileSchool
        if (!fields["profileSchool"]) {
            formIsValid = false;
            errors["profileSchool"] = "profileSchool can't be empty";
        }
        //profileHomeTown
        if (!fields["profileHomeTown"]) {
            formIsValid = false;
            errors["profileHomeTown"] = "profileHomeTown can't be empty";
        }
        //profileLanguages
        if (!fields["profileLanguages"]) {
            formIsValid = false;
            errors["profileLanguages"] = "profileLanguages can't be empty";
        }
        //profileGender
        if (!fields["profileGender"]) {
            formIsValid = false;
            errors["profileGender"] = "profileGender can't be empty";
        }
        //profilePhoneNumber
        if (!fields["profilePhoneNumber"]) {
            formIsValid = false;
            errors["profilePhoneNumber"] = "profilePhoneNumber can't be empty";
        }
        this.setState({ errors: errors });
        return formIsValid;
    }
    //profileFirstName change handler to update state variable with the text entered by the user
    profileFirstNameHandler = (e) => {
        let fields = this.state.fields;
        fields["profileFirstName"] = e.target.value;
        this.setState({ fields });
        this.setState({
            profileFirstName: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    profileLastNameHandler = (e) => {
        let fields = this.state.fields;
        fields["profileLastName"] = e.target.value;
        this.setState({ fields });

        this.setState({
            profileLastName: e.target.value
        })
    }
    //profileAboutMe change handler to update state variable with the text entered by the user
    profileAboutMeHandler = (e) => {
        let fields = this.state.fields;
        fields["profileAboutMe"] = e.target.value;
        this.setState({ fields });
        this.setState({
            profileAboutMe: e.target.value
        })
    }
    //profileCity change handler to update state variable with the text entered by the user
    profileCityHandler = (e) => {
        let fields = this.state.fields;
        fields["profileCity"] = e.target.value;
        this.setState({ fields });

        this.setState({
            profileCity: e.target.value
        })
    }
    //profileCountry change handler to update state variable with the text entered by the user
    profileCountryHandler = (e) => {
        let fields = this.state.fields;
        fields["profileCountry"] = e.target.value;
        this.setState({ fields });
        this.setState({
            profileCountry: e.target.value
        })
    }
    //profileCompany change handler to update state variable with the text entered by the user
    profileCompanyHandler = (e) => {
        let fields = this.state.fields;
        fields["profileCompany"] = e.target.value;
        this.setState({ fields });

        this.setState({
            profileCompany: e.target.value
        })
    }
    //profileSchool change handler to update state variable with the text entered by the user
    profileSchoolHandler = (e) => {
        let fields = this.state.fields;
        fields["profileSchool"] = e.target.value;
        this.setState({ fields });
        this.setState({
            profileSchool: e.target.value
        })
    }
    //profileHomeTown change handler to update state variable with the text entered by the user
    profileHomeTownHandler = (e) => {
        let fields = this.state.fields;
        fields["profileHomeTown"] = e.target.value;
        this.setState({ fields });

        this.setState({
            profileHomeTown: e.target.value
        })
    }
    //profileLanguages change handler to update state variable with the text entered by the user
    profileLanguagesHandler = (e) => {
        let fields = this.state.fields;
        fields["profileLanguages"] = e.target.value;
        this.setState({ fields });
        this.setState({
            profileLanguages: e.target.value
        })
    }
    //profileGender change handler to update state variable with the text entered by the user
    profileGenderHandler = (e) => {
        let fields = this.state.fields;
        fields["profileGender"] = e.target.value;
        this.setState({ fields });

        this.setState({
            profileGender: e.target.value
        })
    }
    //profilePhoneNumber change handler to update state variable with the text entered by the user
    profilePhoneNumberHandler = (e) => {
        let fields = this.state.fields;
        fields["profilePhoneNumber"] = e.target.value;
        this.setState({ fields });

        this.setState({
            profilePhoneNumber: e.target.value
        })
    }


    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        var result = true;//this.handleValidation();
        //prevent page from refresh
        e.preventDefault();
  
        //set the with credentials to true
        if (result === true) { 
            var tokenemail = localStorage.getItem('tokenemail');
 
            this.props.postUserProfileMutation({
                variables: {
                    email:tokenemail,
                    firstName: this.state.profileFirstName,
                    lastName: this.state.profileLastName,
                    aboutme: this.state.profileAboutMe,
                    city: this.state.profileCity,
                    country: this.state.profileCountry,
                    company: this.state.profileCompany,
                    school: this.state.profileSchool,
                    hometown: this.state.profileHomeTown,
                    languages: this.state.profileLanguages,
                    gender: this.state.profileGender,
                    phonenumber: this.state.profilePhoneNumber,
                    oort: this.state.oORt
                }, 
            }).then(response => {
                console.log(response);
                alert("Successfully Updated.");
                        this.setState({
                            authFlag: true
                        })
                 
            }).catch(err=>{
                console.log("this is the error", err); 
                alert("There is an error.");
                this.setState({
                    authFlag: false
                })
            })


            /*axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post(`${ROOT_URL}/userProfile/`+tokenemail, data,{headers:{Authorization:token}})
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        alert("Successfully Updated.");
                        this.setState({
                            authFlag: true
                        })
                    } else {
                        alert("Invalid Credentials.");
                        this.setState({
                            authFlag: false
                        })
                    }
                })
                .catch(err => {
                    console.log("Error.");
                    alert("Invalid Credentials.");
                });*/

        }
        window.scrollTo(0, 0)
    }

    render() {
        require('./userProfile.css');
        let redirect = null;
        //if (!cookie.load('cookie')) {
        if(!localStorage.getItem("travelerCookie")){
            redirect = <Redirect to="/mainPage" />
        }

        let UserNavbar = null;
        let fname = localStorage.getItem('userfirstName');
        if (this.state.editPic) {
            UserNavbar = (
                <div className="editPicture">
                    <h2>Upload your photo</h2>
                    <form onSubmit={this.onSubmit}>
                        <label for="uploadPhotoInput" class="btn btn-default center-block picprofileButton">
                            <input type="file" id="uploadPhotoInput" name="selectedFile" onChange={this.onChange} />
                            <strong>Browse Computer</strong>
                        </label>
                        <button className="picButtonsubmit" type="submit">Submit</button>
                        <button className="picButtonsubmit" onClick={this.handleGetPhoto}>Get Photo</button>
                    </form>

                    {/* <div>
                    <img src = {this.state.imageView}/>
                </div>  */}
                </div>
            );
        }


        return (
            <div>
                {redirect}
                <nav class="navbar navbar-default Profilenewnavbar">
                    <div className="container-fluid ">
                        <div class="navbar-header">
                            <a class="navbarLogoTraveler" href="/mainPage">HomeAway</a>
                        </div>

                        <div class="nav navbar-nav navbar-right ProfilenavbarText navbarbirdhouse ">

                            <li><a href="/myTrips">Trip Boards</a></li>
                            <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">{fname}<span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li><a href="/travelerInbox">Inbox</a></li>
                                    <li><a href="/myTrips">My Trips</a></li>
                                    <li><a href="">My Profile</a></li>
                                    {/*  <li><a href="#">Account</a></li>
                                    <li><a href="#">Owner DashBoard</a></li> */}
                                    <li><Link to="/mainPage" onClick={this.handleLogout}>Logout</Link></li>
                                </ul>
                            </li>
                            <li><a href="/travelerInbox"><span class="glyphicon glyphicon-envelope"></span></a></li>
              
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
                            <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg" />

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
                                    <input type="text" value={this.state.profileFirstName} onChange={this.profileFirstNameHandler} className="form-control profileInput" id="profileFirstName" placeholder="First Name"></input>
                                    <span style={{ color: "red" }}>{this.state.errors["profileFirstName"]}</span>
                                </div>
                                <div class="form-group">
                                    <input type="text" value={this.state.profileLastName} onChange={this.profileLastNameHandler} className="form-control profileInput" id="profileLastName" placeholder="Last Name" />
                                    <span style={{ color: "red" }}>{this.state.errors["profileLastName"]}</span>
                                </div>
                                <div class="form-group">
                                    <input type="text" value={this.state.profileAboutMe} onChange={this.profileAboutMeHandler} className="form-control profileInput" id="profileAboutMe" placeholder="About Me" />
                                    <span style={{ color: "red" }}>{this.state.errors["profileAboutMe"]}</span>
                                </div>
                                <div class="form-group">
                                    <input type="text" value={this.state.profileCity} onChange={this.profileCityHandler} className="form-control profileInput" id="profileCity" placeholder="My City" />
                                    <span style={{ color: "red" }}>{this.state.errors["profileCity"]}</span>
                                </div>
                                <div class="form-group">
                                    <input type="text" value={this.state.profileCountry} onChange={this.profileCountryHandler} className="form-control profileInput" id="profileCountry" placeholder="My Country" />
                                    <span style={{ color: "red" }}>{this.state.errors["profileCountry"]}</span>
                                </div>
                                <div class="form-group">
                                    <input type="text" value={this.state.profileCompany} onChange={this.profileCompanyHandler} className="form-control profileInput" id="profileCompany" placeholder="Company" />
                                    <span style={{ color: "red" }}>{this.state.errors["profileCompany"]}</span>
                                </div>
                                <div class="form-group">
                                    <input type="text" value={this.state.profileSchool} onChange={this.profileSchoolHandler} className="form-control profileInput" id="profileSchool" placeholder="School" />
                                    <span style={{ color: "red" }}>{this.state.errors["profileSchool"]}</span>
                                </div>
                                <div class="form-group">
                                    <input type="text" value={this.state.profileHomeTown} onChange={this.profileHomeTownHandler} className="form-control profileInput" id="profileHomeTown" placeholder="Hometown" />
                                    <span style={{ color: "red" }}>{this.state.errors["profileHomeTown"]}</span>
                                </div>
                                <div class="form-group">
                                    <input type="text" value={this.state.profileLanguages} onChange={this.profileLanguagesHandler} className="form-control profileInput" id="profileLanguages" placeholder="Languages" />
                                    <span style={{ color: "red" }}>{this.state.errors["profileLanguages"]}</span>
                                </div>
                                <div class="form-group">
                                    <input type="text" value={this.state.profileGender} onChange={this.profileGenderHandler} className="form-control profileInput" id="profileGender" placeholder="Gender" />
                                    <span style={{ color: "red" }}>{this.state.errors["profileGender"]}</span>
                                </div>
                                <div class="form-group">
                                    <input type="number" value={this.state.profilePhoneNumber} onChange={this.profilePhoneNumberHandler} className="form-control profileInput" id="profilePhoneNumber" placeholder="Phone Number" />
                                    <span style={{ color: "red" }}>{this.state.errors["profilePhoneNumber"]}</span>
                                </div>
                                <button type="submit" onClick={this.submitLogin} className="profileButton">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
 
export default withApollo(compose(
    graphql(postUserProfileMutation, {name:"postUserProfileMutation"})
)(signUp));