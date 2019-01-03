import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
