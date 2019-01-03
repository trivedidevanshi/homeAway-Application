import React, { Component } from 'react';
import LoginNavBar from '../LoginNavBar';
import axios from 'axios'; 
import { Redirect } from 'react-router';


import {ROOT_URL} from '../../root_url';

class ownerSignup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            authFlag: false,
            fields: {},
            errors: {}
        }
        //Bind the handlers to this class
        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.handleValidation = this.handleValidation.bind(this);

    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    //firstName change handler to update state variable with the text entered by the user
    firstNameChangeHandler = (e) => {
        let fields = this.state.fields;
        fields["firstName"] = e.target.value;
        this.setState({ fields });
        this.setState({
            firstName: e.target.value
        })
    }
    //lastName change handler to update state variable with the text entered by the user
    lastNameChangeHandler = (e) => {
        let fields = this.state.fields;
        fields["lastName"] = e.target.value;
        this.setState({ fields });
        this.setState({
            lastName: e.target.value
        })
    }

    //email change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        let fields = this.state.fields;
        fields["email"] = e.target.value;
        this.setState({ fields });
        this.setState({
            email: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        let fields = this.state.fields;
        fields["password"] = e.target.value;
        this.setState({ fields });

        this.setState({
            password: e.target.value
        })
    }
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //firstName
        if (!fields["firstName"]) {
            formIsValid = false;
            errors["firstName"] = "firstName can't be empty";
        }
        //lastName
        if (!fields["lastName"]) {
            formIsValid = false;
            errors["lastName"] = "lastName can't be empty";
        }
 
        //email
        var reex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
        if (!fields["email"] || !reex.test(fields["email"])) {
            formIsValid = false;
            errors["email"] = "Please Enter correct email.";
        }

        //password
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "password can't be empty";
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        var result = this.handleValidation();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }
        //set the with credentials to true
        if (result === true) {
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post(`${ROOT_URL}/ownerSignup`, data)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        this.setState({
                            authFlag: true
                        })
                        alert("Owner created");
                    } else {
                        this.setState({
                            authFlag: false
                        })
                    }
                })
                .catch(err => {
                    console.log("noo");
                    alert("Owner not created. Email already exists");
                });
        }
    }

    render() {
        require('./ownerSignup.css');
        return (
            <div>
                <LoginNavBar />

                <div className="container-fluid travelerLoginBackground">

                    <div className="travelerLoginFormBackground">
                        <div className="travelerLoginClass">
                            <h3 className="SignupLoginText">Owner Sign Up</h3>
                            <h4>Already have an account? <a href="/ownerLogin">Login In</a></h4>

                        </div>
                        <div className="signUpLoginBack">

                            <form >
                                <div class="form-group">
                                    <input type="text" onChange={this.firstNameChangeHandler} className=" signUpInput" id="signUpfirstName" placeholder="First Name" />
                                    <input type="text" onChange={this.lastNameChangeHandler} className=" signUpInputLastname" id="signUplastName" placeholder="Last Name" />
                                    <span style={{ color: "red" }}>{this.state.errors["firstName"]}</span><br></br>
                                    <span style={{ color: "red" }}>{this.state.errors["lastName"]}</span>

                                </div>
                                <div class="form-group">
                                    <input type="email" onChange={this.emailChangeHandler} className="signUpInputFont" id="signUpinputEmail" placeholder="Email Address" />
                                    <span style={{ color: "red" }}>{this.state.errors["email"]}</span>

                                </div>
                                <div class="form-group">
                                    <input type="password" onChange={this.passwordChangeHandler} className="signUpInputFont" id="signUpinputPassword" placeholder="Password" />
                                    <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                                </div> <br></br><br></br>
                                <div className="signUpForm">
                                    <button type="submit" onClick={this.submitLogin} className="signUpButton">Sign Me Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>




            </div>
        )
    }
}



export default ownerSignup;