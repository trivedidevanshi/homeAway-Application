import React, { Component } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';
import SideBar from '../SideBar';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';


import {ROOT_URL} from '../../root_url';

class ownerInbox extends Component {
    constructor(props){
        super(props);
       
        this.state={ 
            rdata: [{}],
            message:"",
            gotData: false,
            replied: false
        } 
        this.handleReply = this.handleReply.bind(this);
        this.handleMessage=this.handleMessage.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        var token = localStorage.getItem('token');
        
        var tokenemail = localStorage.getItem('tokenemail');

        axios.defaults.withCredentials = true;
        axios.get(`${ROOT_URL}/getownerMessage/`+tokenemail,{headers:{Authorization:token}})
            .then(res => {
                console.log("The received data is : ",res.data);
                let i = 0;
                for (i = 0; i < res.data.length; i++) {
                    this.setState({
                        rdata: this.state.rdata.concat([{
                            propName: res.data[i].propName,
                            msg: res.data[i].msg,
                            travelerEmail: res.data[i].travelerEmail,
                            ownerReply: res.data[i].ownerReply
                        }])
                    });
                }
                if(res.data.length>0){
                    this.setState({
                        gotData: true
                    }); 
                }
                else{
                    this.setState({
                        gotData: false
                    }); 
                }
            })
            .catch(err => {
                console.log("Error in traveler Messages");
            });

    }

    handleReply = (e) => {
        console.log("Book Property : ", e.propName);
        console.log("the reply of owner is : ", this.state.message);
        const data = {
            replypropName: e.propName,
            replytravelerMessage : e.msg,
            replytravelerEmail: e.travelerEmail,
            replymessage: this.state.message
        }

        console.log("The data being sent to the backend is : " + JSON.stringify(data));
        var token = localStorage.getItem('token');
        var tokenemail = localStorage.getItem('tokenemail');

        axios.defaults.withCredentials = true;
        axios.post(`${ROOT_URL}/ownerReply/`+tokenemail, data,{headers:{Authorization:token}})
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("Success !!!!!!!");  
                    alert("The response has been sent!!");
                    this.setState({
                        replied: true,
                    })
                    window.location.reload();
                }
                else {
                    this.setState({
                        replied: false
                    })
                }
            })
            .catch(err => {
                alert("Cannot send reply due to some error.");
            });
    }
 
    handleMessage=(e)=>{
        this.setState({
            message:e.target.value
        })
    }

    render() {
        require('./ownerInbox.css');
        var redirect=null;
        //if(!cookie.load('ownercookie')){
        if(!localStorage.getItem("ownerCookie")){
            redirect = <Redirect to= "/mainPage"/>
        }
         
        var DisplayData=null;
        var yourReply = null;
        
 
        if (this.state.gotData) {
            DisplayData = (

                Object.keys(this.state.rdata).map(function (key) {

                    console.log('key: ', key);  // Returns key: 1 and key: 2
                    if (key != 0) {
                        var propName = this.state.rdata[key].propName;
                        var msg = this.state.rdata[key].msg; 
                        var travelerEmail = this.state.rdata[key].travelerEmail;
                        var ownerReply = this.state.rdata[key].ownerReply;
                        console.log("ownerReply"+ownerReply);
 
                        if(ownerReply != undefined){
                            yourReply=(
                                <p className="ownerResponse">Your Reply: {ownerReply}</p>
                            )
                        }else{
                            yourReply=(
                                <p></p>
                            )
                        }

                        console.log("Property name : " + propName);
                        return (
                            <div className="row dashboardProps">

                                <div className="info"> 
                                    <h3>Property Name: {propName}</h3>
                                    <h4>Message: {msg}</h4>
                                    <p>Traveler Email: {travelerEmail}</p>
                                    {yourReply}
                                    <textarea rows="5" cols="50" onChange={this.handleMessage} placeholder="Send Your Reply"></textarea><button onClick={() => this.handleReply({propName,msg,travelerEmail} )} className="replyButton"><i class="fa fa-mail-reply"></i>Reply</button>
                                </div>  
                            </div>
                        );
                    }
                }, this)

            )
        }else{
            DisplayData=(
                <div><h3>No messages yet!</h3></div>
            )
        }

        return (
            <div> 
                {redirect}
                <OwnerNavbar/>  

                <div className="container-fluid ownerPropDetails">
                    <div className="ownerPropDashboard">
                        <h2 className="propText">Your Inbox: </h2>
                        {DisplayData}

                        <br></br>
                        <br></br>
                    </div>
                </div>
            </div> 
        )
    }
}

export default ownerInbox;