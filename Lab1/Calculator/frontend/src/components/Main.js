import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Calci from './Calci/Calci'; 

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div> 
                <Route path="/" component={Calci}/> 
            </div>
        )
    }
}
//Export The Main Component
export default Main;