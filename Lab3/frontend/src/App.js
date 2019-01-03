import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
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

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});

class App extends Component {
  render() {
    return (

      /*   //Use Browser Router to route to different pages */
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              {/* App Component Has a Child Component called Main*/}

              <Switch>
                <Main />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </ApolloProvider>

      /* document.querySelector(".container") */
    );
  }
}

export default App;
