import React, { Component } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';
import SideBar from '../SideBar';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class ownerPhotos extends Component {
    constructor(props){
        super(props);
        
        this.state={
            gotoDetailsFlag:false,
            gotoPricingFlag:false,
            description: '',
            selectedFile: '',
            imageView : ''
             
        }
        
        this.onSubmit=this.onSubmit.bind(this);
        this.handleGotoDetails=this.handleGotoDetails.bind(this);
        this.handleGotoPricing=this.handleGotoPricing.bind(this);
    }
    
    onChange = (e) => {
        if(e.target.name == 'selectedFile'){
          this.setState({
            selectedFile: e.target.files[0]
          })
        }else{
          this.setState({ [e.target.name]: e.target.value });
        }
    }
  
    onSubmit = (e) => {
      e.preventDefault();
      const { description, selectedFile } = this.state;
      let formData = new FormData();
        console.log(selectedFile);
      formData.append('description', description);
      formData.append('selectedFile', selectedFile);
  
        axios.post('http://localhost:3001/multiple', formData)
          .then((result) => {
            console.log("Result final: "+JSON.stringify(result.data));

            if (typeof(Storage) !== "undefined") {
                // Store
                localStorage.setItem("ownerImage", JSON.stringify(result.data));
            
            } else {
                console.log("Sorry, your browser does not support Web Storage...");
            }


            console.log("theee : "+localStorage.getItem("ownerImage"));

          });
  
    }
  
    handleGetPhoto = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/multiple/download/'+'download.jpg')
          .then(response => {
              console.log("Image Res : ",response);
              let imagePreview = 'data:image/jpg;base64, ' + response.data;
              this.setState({
                  imageView: imagePreview
              })
          });
    }

    componentDidMount(){
        window.scrollTo(0, 0)
    }
    handleGotoDetails=(e)=>{
        this.setState({
            gotoDetailsFlag:true
        })
    }
    handleGotoPricing=(e)=>{
        this.setState({
            gotoPricingFlag:true
        })
    }

    render() {
        
        const { description, selectedFile } = this.state;
        var redirect=null;
        if(this.state.gotoDetailsFlag){
            redirect = <Redirect to= "/ownerDetails"/>
        }
        if(this.state.gotoPricingFlag){
            redirect = <Redirect to= "/ownerPricing"/>
        }
        
        require('./ownerPhotos.css');

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
                                            <input type="file"  onChange={this.onChange} name="selectedFile" id="uploadPhotoInput" multiple /><strong>SELECT PHOTOS TO UPLOAD</strong>
                                            
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
                                        <button onClick = {this.handleGotoDetails} className="buttonForm" type="submit">back</button>
                                        <button onClick = {this.handleGotoPricing} className="buttonForm" type="submit">next</button>
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