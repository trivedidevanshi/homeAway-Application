import React, { Component } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';
import SideBar from '../SideBar';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class ownerLocation extends Component {
    constructor(props){
        super(props);
       
        this.state={
            headline:"",
            propDescription:"",
            propType:"",
            bedroom:"",
            accomodates:"",
            bathrooms:"",

            gotoWelcomeFlag:false,
            gotoDetailsFlag:false
        }
        this.handleHeadline = this.handleHeadline.bind(this);
        this.handlePropDescription = this.handlePropDescription.bind(this);
        this.handlePropType = this.handlePropType.bind(this);
        this.handleBedrooms = this.handleBedrooms.bind(this);
        this.handleAccomodates = this.handleAccomodates.bind(this);
        this.handleBathrooms = this.handleBathrooms.bind(this);
        this.handleGotoWelcome = this.handleGotoWelcome.bind(this);
        this.handleGotoDetails = this.handleGotoDetails.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleHeadline=(e)=>{
        this.setState({
            headline:e.target.value
        })
    }
    handlePropDescription=(e)=>{
        this.setState({
            propDescription:e.target.value
        })
    }
    handlePropType=(e)=>{
        this.setState({
            propType:e.target.value
        })
    }
    handleBedrooms=(e)=>{
        this.setState({
            bedroom:e.target.value
        })
    }
    handleAccomodates=(e)=>{
        this.setState({
            accomodates:e.target.value
        })
    }
    handleBathrooms=(e)=>{
        this.setState({
            bathrooms:e.target.value
        })
    }

    handleGotoWelcome=(e)=>{
        this.setState({
            gotoWelcomeFlag:true
        })
    }
    handleGotoDetails=(e)=>{
        if (typeof(Storage) !== "undefined") {
            // Store
            localStorage.setItem("headline", this.state.headline);
            localStorage.setItem("propDescription", this.state.propDescription);
            localStorage.setItem("propType", this.state.propType);
            localStorage.setItem("bedroom", this.state.bedroom);
            localStorage.setItem("accomodates", this.state.accomodates);
            localStorage.setItem("bathrooms", this.state.bathrooms);
            // Retrieve
            console.log(localStorage.getItem("headline"));
        } else {
            console.log("Sorry, your browser does not support Web Storage...");
        }

        this.setState({
            
            gotoDetailsFlag:true
        })
    }
    render() {
        require('./ownerLocation.css');
        var redirect=null;
        if(this.state.gotoWelcomeFlag){
            redirect = <Redirect to= "/ownerWelcome"/>
        }
        if(this.state.gotoDetailsFlag){
            redirect = <Redirect to= "/ownerDetails"/>
        }
        return (
            <div> 
                {redirect}
                <OwnerNavbar/>  

                <div className="container-fluid ownerPropBack">
                    <div class="row">
                        <SideBar/>
    
                        <div class="col-md-8 ">
                            <div className="myForm">
                                <form>
                                    <div class="form-group ">
                                        <h3>Describe your property</h3>
                                    </div><hr></hr>
                                    <div class="form-group ">
                                        <h4>Start out with a descriptive headline and a detailed summary of your property.</h4>
                                    </div>
                                    <div class="form-group ">
                                        <input onChange={this.handleHeadline} type="text" id="headline"  className="myTextBox" placeholder="Headline"/>
                                    </div>
                                    <div class="form-group">
                                        <textarea onChange={this.handlePropDescription} type="text" id="propDescription" className="myTextBox" placeholder="Property Description"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" onChange={this.handlePropType} id="propType" className="myTextBox1" placeholder="Property Type"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="number" onChange={this.handleBedrooms} id="bedrooms" className="myTextBox1" placeholder="Bedrooms"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="number" onChange={this.handleAccomodates} id="accomodates" className="myTextBox1" placeholder="Accomodates"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="number" onChange={this.handleBathrooms} id="bathrooms" className="myTextBox1" placeholder="BathRooms"/>
                                    </div>
                                    <div className="form-group buttonForm1">
                                        <button onClick = {this.handleGotoWelcome} className="buttonForm" type="submit">back</button>
                                        <button onClick = {this.handleGotoDetails} className="buttonForm" type="submit">next</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>

                
            </div> 
        )
    }
}

export default ownerLocation;