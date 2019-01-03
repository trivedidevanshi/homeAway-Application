import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
 
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import Main from './components/Main'; 


import RootReducer from "./reducers";
/* import BooksIndex from "./components/books_index";
import NewBook from "./components/book_new"; */

//middleware settings
// To resolve promise to store we use apply
const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(RootReducer, composePlugin(applyMiddleware(promise)));
//createStoreWithMiddleware(RootReducer)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      {/*   //Use Browser Router to route to different pages */}
        <BrowserRouter>
          <div>
            {/* App Component Has a Child Component called Main*/}
            
              <Switch>
                <Main/>
                   
              </Switch>
          </div>
        </BrowserRouter>
      </Provider>//,
      /* document.querySelector(".container") */
    );
  }
}

export default App;
