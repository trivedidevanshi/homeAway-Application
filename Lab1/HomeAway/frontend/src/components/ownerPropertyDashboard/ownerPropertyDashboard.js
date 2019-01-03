import React, { Component } from 'react';
import axios from 'axios';
import OwnerNavbar from '../OwnerNavbar';
import { Redirect } from 'react-router';

class ownerPropertyDashboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            propName:'',
            propDescription:'',
            address:'',
            city:'',
            state:'',
            country:'',
            zipcode:'',
            propPhotos:'',
            rdata: [{}],
            gotData:false,
            gotoLocationFlag : false
        }
        
        this.handleGotoLocation = this.handleGotoLocation.bind(this);
     
    }

 
    componentDidMount() {
        window.scrollTo(0, 0);
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/ownerPropertyDashboard')
            .then(res => {
               // console.log(res.data[0].propName);
               // console.log(this.state.rdata[0].name);
                let i=0;    
                for(i=0;i<res.data.length;i++){
                    this.setState({
                        rdata: this.state.rdata.concat([{ propName: res.data[i].propName, 
                            propDescription:res.data[i].propDescription,
                            address:res.data[i].address,
                            city:res.data[i].city,
                            state:res.data[i].state,
                            country:res.data[i].country,
                            zipcode:res.data[i].zipcode,
                            propPhotos:res.data[i].propPhotos
                        }])
                    });
                }
                this.setState({
                    gotData:true
                });
                console.log(this.state.rdata[1].propDescription);
                console.log(this.state.rdata[2].propName);
            })
            .catch(err=>{
                console.log("Error in userProfile get");
            });
    }
    
    handleGotoLocation=(e)=>{
        this.setState({
            gotoLocationFlag:true
        })
    }

    render() {
        require('./ownerPropertyDashboard.css');
        let redirect = null; 
        if(this.state.gotoLocationFlag){
            redirect = <Redirect to= "/ownerLocation"/>
        }
        let DisplayData=null;
        if(this.state.gotData){
            DisplayData=( 
            
            Object.keys(this.state.rdata).map(function (key) {
            
                 console.log('key: ', key);  // Returns key: 1 and key: 2
                 if(key!=0){
                 var propName = this.state.rdata[key].propName;
                 var propDescription = this.state.rdata[key].propDescription;
                 var address = this.state.rdata[key].address;
                 var city = this.state.rdata[key].city;
                 var state = this.state.rdata[key].state;
                 var country = this.state.rdata[key].country;
                 var zipcode = this.state.rdata[key].zipcode;
                 var propPhotos = this.state.rdata[key].propPhotos;

                 let imagePreview = 'data:image/jpg;base64, ' + propPhotos;

                 console.log("item : "+propName);
                 return (
                     <div className="row dashboardProps">
                        <div class="col-lg-3">
                            
                            <img className="imageProp" src={imagePreview}></img>
                        </div>
                        <div class="col-lg-9" >
                            <h3>{propName}</h3>
                            <h4>{address},{city},{state},{country},{zipcode}</h4>
                      
                        </div>
                        
                     </div>
                     );
                 }
                 }, this)

            )
        }
        return (
            <div> 
                {redirect}
                <OwnerNavbar/>  

                <div className="container-fluid ownerPropDetails">
                    <div className="ownerPropDashboard">
                    <h2 className="propText">Property List</h2>
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