import React, { Component } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';
import SideBar from '../SideBar';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';


import {ROOT_URL} from '../../root_url';

class ownerPhotos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gotoDetailsFlag: false,
            gotoPricingFlag: false,
            description: '',
            selectedFile: '',
            imageString: '',
            imageArrayLength: '',
            imageView: '',
            imagesadded:false

        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleGotoDetails = this.handleGotoDetails.bind(this);
        this.handleGotoPricing = this.handleGotoPricing.bind(this);
    }

    onChange = (e) => {
        if (e.target.name == 'selectedFile') {
            /* this.setState({
               selectedFile: e.target.files
             })*/

            console.log(e.target.files);
            this.setState({
                imageArrayLength: e.target.files.length
            })
            var selectedfile = [];
            for (var j = 0; j < e.target.files.length; j++) {
                selectedfile.push(e.target.files[j]);
                console.log(e.target.files[0]);
            }
            console.log("selectedfile : " + selectedfile);

            this.setState({
                selectedFile: selectedfile
            })

            var imagearray = [];

            for (var i = 0; i < e.target.files.length; i++) {
                imagearray.push(e.target.files[i].name);
            }
            console.log("Image array : " + imagearray);

            var ans=imagearray.toString();
            console.log("storing image array to string: "+ans);
            
            this.setState({
                imageString: ans
            })


        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
       // const { description, selectedFile } = this.state;
        let formData = new FormData();
        console.log("selected files after submit----------------------------");
        console.log(this.state.selectedFile);
      //  formData.append('description', description);
        console.log("image array length: " + this.state.imageArrayLength);
        for (let i = 0; i < this.state.imageArrayLength; i++) {
            formData.append('selectedFile', this.state.selectedFile[i]);
            console.log("formdata iteration "+i);
            console.log(formData[i]);
        }
        console.log("The formdata is : ");
        console.log(formData);


        if(this.state.imageArrayLength<2 || this.state.imageArrayLength>5){
            alert("Please select min 2 max 5 photos.")
           
            this.setState({
                imagesadded: false
            })

        }else{

            axios.post(`${ROOT_URL}/multiple`, formData)
                .then((result) => {
                    console.log("Result final: " + JSON.stringify(result.data));
                    this.setState({
                        imagesadded: true
                    })

                    if (typeof (Storage) !== "undefined") {
                        // Store
                        localStorage.setItem("ownerImage", this.state.imageString);
                        console.log(typeof(this.state.imageString));
                        console.log("owner images: "+ localStorage.getItem("ownerImage"));
                        alert("Successfully submitted! Photos");

                    } else {
                        console.log("Sorry, your browser does not support Web Storage...");
                    }
                });
            }

    }

    handleGetPhoto = (e) => {
        e.preventDefault();
        axios.post(`${ROOT_URL}/multiple/download/` + 'download.jpg')
            .then(response => {
                console.log("Image Res : ", response);
                let imagePreview = 'data:image/jpg;base64, ' + response.data;
                this.setState({
                    imageView: imagePreview
                })
            });
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }
    handleGotoDetails = (e) => {
        this.setState({
            gotoDetailsFlag: true
        })
    }
    handleGotoPricing = (e) => {
        if(this.state.imagesadded==true){
            this.setState({
                gotoPricingFlag: true
            })
        }else{
            this.setState({
                gotoPricingFlag: false
            })
            alert("Please select images");
        }
    }

    render() {

        console.log("Render-image string: " + this.state.imageString);
        console.log("Selected files: " + this.state.selectedFile);
        console.log("Selected files: " + JSON.stringify(this.state.selectedFile));
        
        const { description, selectedFile } = this.state;
        var redirect = null;
        //if(!cookie.load('ownercookie')){
        if(!localStorage.getItem("ownerCookie")){
            redirect = <Redirect to= "/mainPage"/>
        }
        if (this.state.gotoDetailsFlag) {
            redirect = <Redirect to="/ownerDetails" />
        }
        if (this.state.gotoPricingFlag) {
            redirect = <Redirect to="/ownerPricing" />
        }

        require('./ownerPhotos.css');

        return (
            <div>
                {redirect}
                <OwnerNavbar />

                <div className="container-fluid ownerPropBack">
                    <div class="row">
                        <SideBar />

                        <div class="col-md-8 ">
                            <div className="myForm">
                                <form>
                                    <div class="form-group ">
                                        <h2><strong>Add up to 50 photos of your property</strong></h2>
                                    </div><hr></hr>
                                    <div class="form-group ">
                                        <h5>Showcase your property’s best features (no pets or people, please). Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file size, 6 photos minimum.<a>Need photos? Hire a professional.</a></h5>
                                    </div>
                                    {/* kjsefh */}
                                    {/* <div>
                                        <form onSubmit={this.onSubmit} >
                                             
                                            <input
                                            type="file"
                                            name="selectedFile"
                                            onChange={this.onChange}
                                            multiple/>
                                            <button type="submit">Submit</button>
                                        </form>
                                        <div>
                                            <button onClick = {this.handleGetPhoto}>Get Photo</button>
                                        </div>
                                            <div>
                                            <img src = {this.state.imageView}/>
                                            </div>
                                    </div> */}

                                    <div class="form-group dashedBorder">
                                        <label for="uploadPhotoInput" class="btn btn-default center-block picButton">
                                            <input type="file" onChange={this.onChange} name="selectedFile" id="uploadPhotoInput" multiple /><strong>SELECT PHOTOS TO UPLOAD</strong>

                                        </label>
                                        <button className="submitButton" onClick={this.onSubmit}>SUBMIT</button>
                                        <h4>You can choose to upload more than one photo at a time.</h4>
                                    </div>

                                    {/* <div class="form-group dashedBorder">
                                        <label for="uploadPhotoInput" class="btn btn-default center-block picButton">
                                            <input type="file" id="uploadPhotoInput" multiple /><strong>SELECT PHOTOS TO UPLOAD</strong>
                                        </label>
                                        <h4>You can choose to upload more than one photo at a time.</h4>
                                    </div> */}




                                    <div className="form-group  ">
                                        <button onClick={this.handleGotoDetails} className="buttonForm" type="submit">back</button>
                                        <button onClick={this.handleGotoPricing} className="buttonForm" type="submit">next</button>
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

export default ownerPhotos;