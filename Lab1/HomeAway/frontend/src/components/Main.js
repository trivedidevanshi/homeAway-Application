import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import mainPage from './mainPage/mainPage';
import travelerLogin from './travelerLogin/travelerLogin';
import signUp from './signUp/signUp';
import userProfile from './userProfile/userProfile';
import ownerWelcome from './ownerWelcome/ownerWelcome';
import ownerDetails from './ownerDetails/ownerDetails';
import ownerLocation from './ownerLocation/ownerLocation';
import ownerPhotos from './ownerPhotos/ownerPhotos';
import ownerPricing from './ownerPricing/ownerPricing';
import ownerLogin from './ownerLogin/ownerLogin';
import ownerSignup from './ownerSignup/ownerSignup';
import ownerPropertyDashboard from './ownerPropertyDashboard/ownerPropertyDashboard';
import searchResult from './searchResult/searchResult';

import myTrips from './myTrips/myTrips';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
              
                <Route path="/mainPage" component={mainPage}/>
                <Route path="/travelerLogin" component={travelerLogin}/>
                <Route path="/signUp" component={signUp}/>
                <Route path="/userProfile" component={userProfile}/>
                <Route path="/ownerWelcome" component={ownerWelcome}/>
                <Route path="/ownerDetails" component={ownerDetails}/>
                <Route path="/ownerLocation" component={ownerLocation}/>
                <Route path="/ownerPhotos" component={ownerPhotos}/>
                <Route path="/ownerPricing" component={ownerPricing}/>
                <Route path="/ownerLogin" component={ownerLogin}/>
                <Route path="/ownerSignup" component={ownerSignup}/>
                <Route path="/ownerPropertyDashboard" component={ownerPropertyDashboard}/>
                <Route path="/searchResult" component={searchResult}/>
                <Route path="/myTrips" component={myTrips}/>
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;