import React, { Component } from 'react';
import './ownerLogin.css';
import LoginNavBar from '../LoginNavBar';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class ownerLogin extends Component {
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email : "",
            password : "",
            authFlag : false,
            fields: {},
            errors: {}
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.handleValidation=this.handleValidation.bind(this);
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

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //email
        if(!fields["email"]){
           formIsValid = false;
           errors["email"] = "email can't be empty";
        } 
         
        //password
        if(!fields["password"]){
           formIsValid = false;
           errors["password"] = "password can't be empty";
        } 
       this.setState({errors: errors});
       return formIsValid;
   }

    //email change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        let fields = this.state.fields;
        fields["email"] = e.target.value;
        this.setState({fields});
        this.setState({
            email : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        let fields = this.state.fields;
        fields["password"] = e.target.value;        
        this.setState({fields});

        this.setState({
            password : e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        var result=this.handleValidation();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password
        }
        //set the with credentials to true
        if(result===true){
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/ownerLogin',data)
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
                    alert("Not an owner.");
                });
                
        }
    }

    render() {
        
          //redirect based on successful login
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/ownerPropertyDashboard"/>
        }

        return (
            <div> 
                {redirectVar}
                <LoginNavBar/>
                <div className="container-fluid travelerLoginBackground">
                    <div className="travelerLoginFormBackground">
                        <div className="travelerLoginClass">
                            <h3 className="travelerLoginText">Owner Login</h3>
                            <h4>Need account? <a href="http://localhost:3000/ownerSignup">Sign Up</a></h4>
                        </div>
                        <div className="travelerLoginBack">
                            <h3>Account Login</h3><hr></hr>
                            <form>
                                <div class="form-group">
                                    <input type="email" onChange = {this.emailChangeHandler} className="form-control travelerLoginInputFont" id="email"  placeholder="Email Address"/>
                                    <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                                </div>
                                <div class="form-group">
                                    <input type="password" onChange = {this.passwordChangeHandler} className="form-control travelerLoginInputFont" id="password" placeholder="Password"/>
                                    <span style={{color: "red"}}>{this.state.errors["password"]}</span> 
                                </div>
                                <h5><a>Forgot Password?</a></h5><br></br>
                                <button onClick = {this.submitLogin} className="travelerLoginButton">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div> 
        )
    }
}
export default ownerLogin;