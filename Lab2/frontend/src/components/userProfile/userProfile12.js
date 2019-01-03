import React, { Component } from 'react';
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import '../travelerLogin/travelerLogin.css';

import { getUserProfile } from "../../actions";

import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class userProfile extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
        //call to action
        this.props.getUserProfile();
        console.log(this.props.travelerLogin.traveleremail);
    }
      
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }
    /*Action call
    Whenever onSubmit event is triggered, execute an action call called createBook 
    */
    onSubmit(values) {
        console.log(values);
        /* this.props.createBook(values, () => {
           this.props.history.push("/");
         });*/
    }

    render() {
        require('./userProfile.css');
        const { handleSubmit } = this.props;
        let fname = localStorage.getItem('userfirstName');

        return (

            <div> 
                <nav class="navbar navbar-default Profilenewnavbar">
                    <div className="container-fluid ">
                        <div class="navbar-header">
                            <a class="navbarLogoTraveler" href="#">HomeAway</a>
                        </div>

                        <div class="nav navbar-nav navbar-right ProfilenavbarText navbarbirdhouse ">

                            <li><a href="#">Trip Boards</a></li>
                            <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">{fname}<span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li><a href="#">Inbox</a></li>
                                    <li><a href="http://localhost:3000/myTrips">My Trips</a></li>
                                    <li><a href="">My Profile</a></li>
                                    <li><a href="#">Account</a></li>
                                    <li><a href="#">Owner DashBoard</a></li>
                                    <li><Link to="/mainPage" onClick={this.handleLogout}>Logout</Link></li>
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
                            <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg" />

                        </div>
                    </div>
                </nav>

                <div className="container-fluid profilebckground">
                    <div className="profileContainer">
                        <div className="profileForm">

                            {/* <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="formType">

                                <Field
                                    // label="firstName"
                                    name="firstName"
                                    type="text"
                                    component={this.renderField}
                                    value="First Name"
                                    className="profileInput"
                                />

                                <button type="submit" className="btn btn-primary">Submit</button>
                                {/* <Link to="/" className="btn btn-danger">Cancel</Link>  
                            </form> */}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function validate(values) {

    const errors = {};

    // Validate the inputs from 'values'
    if (!values.firstName) {
        errors.firstName = "Enter an firstName";

        // If errors is empty, the form is fine to submit
        // If errors has *any* properties, redux form assumes form is invalid
        return errors;
    }
}
/*
export default reduxForm({
    validate,
    form: "NewUserProfile"
})(connect(null, {  })(userProfile));*/

//This method is provided by redux and it gives access to centeral store
function mapStateToProps(state) {
    return { travelerLogin: state.travelerLogin };
}

export default connect(mapStateToProps, { getUserProfile })(userProfile);