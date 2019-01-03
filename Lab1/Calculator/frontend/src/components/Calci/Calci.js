import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import './Calci.css';

class Create extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            displayString : "" 
        }
        this.displayChangeHandler=this.displayChangeHandler.bind(this);
        this.buttonClicked = this.buttonClicked.bind(this);
        this.clearHandler = this.clearHandler.bind(this);
        this.solutionHandler = this.solutionHandler.bind(this); 
    }

    displayChangeHandler = (e) =>{ 
        var asciiKey;
 
        if(window.event) { // IE                    
            asciiKey = e.keyCode;
          } else if(e.which){ // Netscape/Firefox/Opera                   
            asciiKey = e.which;
        }

        var res = String.fromCharCode(asciiKey);
        
        var inputValids=["1","2","3","4","5","6","7","8","9","0",".", "+", "-", "*", "/"];
        if(inputValids.includes(res)){
            this.setState({
            displayString : this.state.displayString + res
            })
        } 
    }

    buttonClicked(data){
    
        console.log(this.state.displayString); 
        var lastDigit= this.state.displayString.charAt( this.state.displayString.length-1)
        console.log(lastDigit);

        if(lastDigit==="+"|| lastDigit==="-" || lastDigit==="*" || lastDigit==="/" || lastDigit===".")
            alert("Please enter a number.");
        else{
            this.setState({
                displayString : this.state.displayString + data
            })
        }
    }

    clearHandler = (e) =>{ 
        this.setState({
            displayString : ""
        })
        console.log(this.state.displayString);
    }

    solutionHandler = (e) => {
        
            var headers = new Headers();
            //prevent page from refresh
            e.preventDefault();
            const data = {
                displayString : this.state.displayString
            }
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/Calci',data)
                .then(response => {
                    console.log("Status Code : ",response.status);
                    if(response.status === 200){
                        console.log(typeof(response.data))
                        this.setState({
                            displayString : response.data.answer
                        })
                    }else{
                        this.setState({ 
                        })
                    }
                });
        
    }

    render(){
        return(
                <div class ="container">
                    <div class = "calci-body">
                         
                        <input class="calci-screen" onKeyPress={this.displayChangeHandler} type="text" placeholder='0' value={this.state.displayString} />
                        <br></br>
                        <br></br>
                        <div class="calci-row">
                            <button onClick={this.clearHandler} class="calci-button c">C</button>
                            <button onClick={this.solutionHandler} class="calci-button c">=</button>
                        </div> 
                        <div class="calci-row">
                            <button onClick={() => this.buttonClicked('+')} class="calci-button">+</button>
                            <button onClick={() => this.buttonClicked('-')} class="calci-button">-</button>
                            <button onClick={() => this.buttonClicked('*')} class="calci-button">*</button>
                            <button onClick={() => this.buttonClicked('/')} class="calci-button">/</button>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Create;