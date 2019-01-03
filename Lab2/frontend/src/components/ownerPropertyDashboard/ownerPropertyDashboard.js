import React, { Component } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';


import {ROOT_URL} from '../../root_url';

class ownerPropertyDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            propName: '',
            propDescription: '',
            address: '',
            city: '',
            state: '',
            country: '',
            zipcode: '',
            propPhotos: '',
            bookeddates: '',
            rdata: [{}],
            gotData: false,
            gotoLocationFlag: false,
            nopropyet: false,

            pageNumber: "1",
            totalProps: ''
        }

        this.handleGotoLocation = this.handleGotoLocation.bind(this);
        this.numberClicked = this.numberClicked.bind(this);

    }

    componentDidMount() {
        window.scrollTo(0, 0);
        axios.defaults.withCredentials = true;
        var token = localStorage.getItem('token');
        var tokenemail = localStorage.getItem('tokenemail');
        let sentdata = {
            pageNoClicked: this.state.pageNumber
        }
        axios.post(`${ROOT_URL}/ownerPropertyDashboard/` + tokenemail, sentdata, { headers: { Authorization: token } })
            .then(res => {
                console.log("res.data.bookeddate " + JSON.stringify(res.data[0].properties[0].bookeddates));

                this.setState({
                    totalProps: res.data[1].pgNum
                });
                console.log("-----------Total num of props of the owner: ----------", this.state.totalProps);

                if (res.data != "Success") {

                    console.log("res.data[0].properties.length: " + res.data[0].properties.length);
                    let i = 0;
                    for (i = 0; i < res.data[0].properties.length; i++) {
                        this.setState({
                            rdata: this.state.rdata.concat([{
                                propName: res.data[0].properties[i].propname,
                                propDescription: res.data[0].properties[i].propdescription,
                                address: res.data[0].properties[i].address,
                                city: res.data[0].properties[i].city,
                                state: res.data[0].properties[i].state,
                                country: res.data[0].properties[i].country,
                                zipcode: res.data[0].properties[i].zipcode,
                                propPhotos: res.data[0].properties[i].propPhotos,
                                bookeddates: res.data[0].properties[i].bookeddates
                            }])
                        });
                    }
                    this.setState({
                        gotData: true
                    });
                } else {
                    console.log("No properties yet!");

                }
            })
            .catch(err => {
                console.log("Error in ownerpropdashboard get");
            });
    }

    numberClicked = (e) => {
        console.log("******((((((()))))))********", e.number);

        let sentdata = {
            pageNoClicked: e.number
        }
        console.log("*************sent data***********", sentdata);
        var token = localStorage.getItem('token');
        var tokenemail = localStorage.getItem('tokenemail');
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/ownerPropertyDashboard/' + tokenemail, sentdata, { headers: { Authorization: token } })
            .then(res => {
                console.log("res.data.bookeddate " + JSON.stringify(res.data[0].properties[0].bookeddates));
                this.setState({
                    rdata: [{}]
                });
                if (res.data != "Success") {

                    console.log("res.data[0].properties.length: " + res.data[0].properties.length);
                    let i = 0;
                    for (i = 0; i < res.data[0].properties.length; i++) {
                        this.setState({
                            rdata: this.state.rdata.concat([{
                                propName: res.data[0].properties[i].propname,
                                propDescription: res.data[0].properties[i].propdescription,
                                address: res.data[0].properties[i].address,
                                city: res.data[0].properties[i].city,
                                state: res.data[0].properties[i].state,
                                country: res.data[0].properties[i].country,
                                zipcode: res.data[0].properties[i].zipcode,
                                propPhotos: res.data[0].properties[i].propPhotos,
                                bookeddates: res.data[0].properties[i].bookeddates
                            }])
                        });
                    }
                    this.setState({
                        gotData: true
                    });
                } else {
                    console.log("No properties yet!");

                }
            })
            .catch(err => {
                console.log("Error in ownerpropdashboard get");
            });


    }

    handleGotoLocation = (e) => {
        this.setState({
            gotoLocationFlag: true
        })
    }

    render() {

        require('./ownerPropertyDashboard.css');
        let redirect = null;
        //if (!cookie.load('ownercookie')) {
        if(!localStorage.getItem("ownerCookie")){
            redirect = <Redirect to="/mainPage" />
        }
        if (this.state.gotoLocationFlag) {
            redirect = <Redirect to="/ownerLocation" />
        }
        let DisplayData = null;
        let bookedpropinfo = null;
        if (this.state.gotData) {
            DisplayData = (

                Object.keys(this.state.rdata).map(function (key) {

                    console.log('key: ', key);  // Returns key: 1 and key: 2
                    if (key != 0) {
                        var propName = this.state.rdata[key].propName;
                        var propDescription = this.state.rdata[key].propDescription;
                        var address = this.state.rdata[key].address;
                        var city = this.state.rdata[key].city;
                        var state = this.state.rdata[key].state;
                        var country = this.state.rdata[key].country;
                        var zipcode = this.state.rdata[key].zipcode;
                        var propPhotos = this.state.rdata[key].propPhotos;
                        var bookeddates = this.state.rdata[key].bookeddates;

                        /////////////////////////////////////////////////////////////
                        console.log("___________booked dates____________");
                        if (bookeddates != undefined) {
                            if (bookeddates.length > 0) {
                                bookedpropinfo = bookeddates.map(messagedata => {
                                    return (
                                        <div>
                                            <p className="bookingmessage">This Property is booked by:</p>
                                            <p className="bookingmessage">Traveleremail : {messagedata.traveleremail}</p>
                                            <p className="bookingmessage">Booked Dates: {messagedata.bookdatestart} to {messagedata.bookdateend} </p>
                                            <hr></hr>
                                        </div>
                                    )
                                })
                            }
                        } else {
                            bookedpropinfo = null;
                        }

                        /////////////////////////////////////////////////////////////
                        var propPhotosArray = propPhotos.split(",");
                        for (var k = 0; k < propPhotosArray.length; k++) {
                            propPhotosArray[k] = "data:image/jpg;base64, " + propPhotosArray[k];
                        }

                        console.log("item : " + propName);

                        return (

                            <div className="row dashboardProps">

                                <div  >

                                    <h3>{propName}</h3>
                                    <h4>{address},{city},{state},{country},{zipcode}</h4>
                                    <div className="bookedpropinfocss">
                                        {bookedpropinfo}
                                    </div>
                                </div>
                                <div  >

                                    <img className="imageProp" src={propPhotosArray[0]}></img>
                                    <img className="imageProp" src={propPhotosArray[1]}></img>
                                    <img className="imageProp" src={propPhotosArray[2]}></img>
                                    <img className="imageProp" src={propPhotosArray[3]}></img>
                                    <img className="imageProp" src={propPhotosArray[4]}></img>
                                    {/* <img className="imageProp" src={imagePreview}></img> */}
                                </div>

                            </div>
                        );
                    }
                }, this)

            )
        }
        else {
            DisplayData = (
                <div><h3 className="nopropyet">No properties yet. </h3></div>
            )
        }

        ////////////////////////////////////////////////////////////
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(Number(this.state.totalProps) / 5); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={() => this.numberClicked({ number })}

                >
                    {number}
                </li>
            );
        });
        ////////////////////////////////////////////////////////////////

        return (
            <div>
                {redirect}
                <OwnerNavbar />

                <div className="container-fluid ownerPropDetails">
                    <div className="ownerPropDashboard">
                        <ul id="page-numbers">
                            <h4 className="pagestext">Pages: </h4> {renderPageNumbers}
                        </ul>
                        <h2 className="propText">Property List</h2>
                        <hr></hr>
                        {DisplayData}
                        <br></br>
                        <br></br>
                    </div>

                </div>
            </div>
        )
    }
}
export default ownerPropertyDashboard;