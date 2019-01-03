import React, { Component } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';
import SideBar from '../SideBar';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class ownerDescribe extends Component {
    constructor(props){
        super(props);
    }
    render() {
        require('./ownerDescribe.css');
        return (
            <div> 
                 
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
                                        <input type="text" id="headline"  className="myTextBox" placeholder="Headline"/>
                                    </div>
                                    <div class="form-group">
                                        <textarea type="text" id="propDescription" className="myTextBox" placeholder="Property Description"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" id="propType" className="myTextBox1" placeholder="Property Type"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="number" id="bedrooms" className="myTextBox1" placeholder="Bedrooms"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="number" id="accomodates" className="myTextBox1" placeholder="Accomodates"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="number" id="bathrooms" className="myTextBox1" placeholder="BathRooms"/>
                                    </div>
                                    <div className="form-group buttonForm1">
                                        <button className="buttonForm" type="submit">back</button>
                                        <button className="buttonForm" type="submit">next</button>
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

export default ownerDescribe;