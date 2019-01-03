import React, { Component } from 'react';

import { graphql, compose } from 'react-apollo';
import { withApollo } from 'react-apollo'
import { loginQuery } from '../../queries/queries'

import './ownerLogin.css';
import LoginNavBar from '../LoginNavBar';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

import { ROOT_URL } from '../../root_url';

class ownerLogin extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email: "",
            password: "",
            authFlag: false,
            fields: {},
            errors: {}
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //email
        var reex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!fields["email"] || !reex.test(fields["email"])) {
            formIsValid = false;
            errors["email"] = "Enter correct email.";
        }

        //password
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "password can't be empty";
        }
        this.setState({ errors: errors });
        return formIsValid;
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

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        var result = this.handleValidation();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        //set the with credentials to true
        if (result === true) {
            console.log("In result=true---------------");
            this.props.client.query({
                query: loginQuery,
                variables: {
                    email: this.state.email,
                    password: this.state.password
                }
            }).then(res => {
                console.log("The email is : ", res.data.userLogin.email);

                if (res.data.userLogin.email === null) {
                    console.log("The email is : null");

                    this.setState({
                        authFlag: false
                    })
                    alert("Not an owner.");
                } else {
                    console.log("The email is not null");
                    localStorage.setItem('ownerCookie', true);

                    localStorage.setItem('tokenemail',res.data.userLogin.email);
                    this.setState({
                        authFlag: true
                    })
                }
            }).catch(err => {
                console.log("the err is : ", err);
                this.setState({
                    authFlag: false
                })
                alert("Not an owner.");
            })
        }
        /* if (result === true) {
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post(`${ROOT_URL}/ownerLogin`, data)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {

                        console.log("the response is: "+response.data.firstName);
                        localStorage.setItem('token',response.data.token);
                        localStorage.setItem('tokenemail',response.data.email);
                        localStorage.setItem('ownerEmailNavbar',response.data.firstName);

                        localStorage.setItem('ownerCookie',true);

                        this.setState({
                            authFlag: true
                        })
                    } else {
                        this.setState({
                            authFlag: false
                        })
                    }
                })
                .catch(err => {
                    console.log("noo");
                    alert("Not an owner.");
                });

        } */
    }

    render() {

        //redirect based on successful login
        let redirectVar = null;
        // if (cookie.load('ownercookie')) {
        if (localStorage.getItem("ownerCookie")) {
            redirectVar = <Redirect to="/ownerPropertyDashboard" />
        }

        return (
            <div>
                {redirectVar}
                <LoginNavBar />
                <div className="container-fluid travelerLoginBackground">
                    <div className="row">
                        <div className="col-lg-6 ">
                            <img className="ownersignupimage" src="https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png"></img>
                        </div>

                        <div className="col-lg-6">
                            <div className="travelerLoginFormBackground">
                                <div className="travelerLoginBack">
                                    <h3>Owner Login</h3>
                                    <h4>Need account? <a href="/ownerSignup">Sign Up</a></h4>
                                    <hr></hr>
                                    <form >
                                        <div class="form-group">
                                            <input type="email" onChange={this.emailChangeHandler} className="form-control ownerLoginInputFont" id="email" placeholder="Email Address" />
                                            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                        </div>
                                        <div class="form-group">
                                            <input type="password" onChange={this.passwordChangeHandler} className="form-control ownerLoginInputFont" id="password" placeholder="Password" />
                                            <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                                        </div>
                                        <h5><a>Forgot Password?</a></h5><br></br>
                                        <button onClick={this.submitLogin} className="travelerLoginButton">Login</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}
//export default graphql(loginQuery)(ownerLogin);

export default withApollo(ownerLogin);