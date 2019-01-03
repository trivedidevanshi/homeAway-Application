import React, { Component } from 'react';
import './travelerLogin.css';
import LoginNavBar from '../LoginNavBar';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { travelerLoginAction } from "../../actions";


import {ROOT_URL} from '../../root_url';


class travelerLogin extends Component {

    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email : "",
            password : "",
            authFlag : false
          
        }
         
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }

    //Define component that you want to render
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input} placeholder={field.label} />
                <div className="text-danger">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }

    renderFieldPassword(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="password" {...field.input} placeholder={field.label} />
                <div className="text-danger">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }


    /*Action call
    Whenever onSubmit event is triggered, execute an action call called createBook 
    */
    onSubmit(values) {
        console.log("values: ", values);
        this.props.travelerLoginAction(values, (response) => {
            if (response.status) {
                if (response.status === 200) {
                    console.log("________________jwt_________________");
                    console.log(response.data.token);
                    console.log('tokenemail: ',response.data.email);
                    localStorage.setItem('token',response.data.token);
                    localStorage.setItem('tokenemail',response.data.email);
                    
                    localStorage.setItem('travelerCookie',true);

                    console.log("_________________________________"+localStorage.getItem('token'));

                    console.log("The response is: ",response.data.firstName);
                    localStorage.setItem('userfirstName', response.data.firstName);

                    console.log("----------get local storage tname:---------- "+localStorage.getItem('userfirstName'));
                    this.setState({
                        authFlag: true
                    })
                } else {
                    alert("Email or password is incorrect.");
                    this.setState({
                        authFlag: false
                    })
                }
                this.props.history.push("/mainPage");
            }
            else{
                console.log("Invalid!");
                alert("Invalid credentials!");
            }
        });
    }

    render() {

        const { handleSubmit } = this.props;

        //redirect based on successful login
        let redirectVar = null;
        //if (cookie.load('cookie')) {
            
        if(localStorage.getItem("travelerCookie")){
            redirectVar = <Redirect to="/mainPage" />
        }

        return (
            <div>
                {redirectVar}
                <LoginNavBar />
                <div className="container-fluid travelerLoginBackground">
                    <div className="travelerLoginFormBackground">
                        <div className="travelerLoginClass">
                            <h3 className="travelerLoginText">Traveler Login to HomeAway</h3>
                            <h4>Need account? <a href="/signUp">Sign Up</a></h4>
                        </div>
                        <div className="traveler1LoginBack">
                            <h3>Account Login</h3><hr></hr>

                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                                <div class="form-group">

                                    <Field
                                        label="Email Address"
                                        name="email"
                                        component={this.renderField}
                                    />

                                    {/* <input type="email" onChange={this.emailChangeHandler} className="form-control travelerLoginInputFont" id="email" placeholder="Email Address" />
                                    <span style={{ color: "red" }}>{this.state.errors["email"]}</span> */}
                                </div>
                                <div class="form-group">
                                    <Field
                                        label="Password"
                                        name="password"
                                        component={this.renderFieldPassword}
                                    />

                                    {/*   <input type="password" onChange={this.passwordChangeHandler} className="form-control travelerLoginInputFont" id="password" placeholder="Password" />
                                    <span style={{ color: "red" }}>{this.state.errors["password"]}</span> */}
                                </div>
                                <h5><a>Forgot Password?</a></h5><br></br>

                                <button type="submit" className="travelerLoginButton">Login</button>

                                {/* <button onClick={this.submitLogin} className="travelerLoginButton">Login</button> */}
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
function validate(values) {

    const errors = {};
    var reex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // Validate the inputs from 'values'
    if (!values.email) {
        errors.email = "Enter Email ID";
    } else if (!reex.test(values.email)) {
        errors.email = "Please enter a valid Email ID";
    }
    if (!values.password) {
        errors.password = "Enter password";
    }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: "NewBookForm"
})(connect(null, { travelerLoginAction })(travelerLogin));
 