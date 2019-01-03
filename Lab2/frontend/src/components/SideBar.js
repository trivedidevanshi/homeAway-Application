import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 

class SideBar extends Component {
    constructor(props){
        super(props);
    }
    render() {
        require('./SideBar.css');
        return (
            <div> 
                 <div class="col-md-4 sidebarBackground">
                            <ul class="nav nav-pills nav-stacked leftMargin">
                                {/* <li className="sidebarText"><Link to="/ownerWelcome"> Welcome</Link></li>
                                <li className="sidebarText"><Link to="/ownerLocation"> Location</Link></li>
                                <li className="sidebarText"><Link to="/ownerDetails"> Details</Link></li>
                                <li className="sidebarText">< Link to="/ownerPhotos"> Photos</Link></li>
                                <li className="sidebarText">< Link to="/ownerPricing"> Pricing</Link></li> */}
                                <li className="sidebarText"> Welcome</li>
                                <li className="sidebarText">Location</li>
                                <li className="sidebarText"> Details</li>
                                <li className="sidebarText"> Photos</li>
                                <li className="sidebarText"> Pricing</li>
                            
                            </ul>
                        </div>
            </div> 
        )
    }
}

export default SideBar;