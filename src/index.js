import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from "./Store/Store";

import cookie from "js-cookie";
import axios from "axios";
import { SWRConfig } from "swr";

axios.defaults.baseURL = 'http://localhost:1337';

let token = cookie.get("token");

const render = () => {
  ReactDOM.render(
  <Provider store={store}>
    
      <App />
   
  </Provider>,
  document.getElementById('root')
)};


  
  if (token) {
      const config = {
          headers: { Authorization: `Bearer ${token}`}
      }
      axios.get('http://localhost:1337/users/me', config)
        .then(res => {
          store.dispatch({ type: "SET_LOGIN", payload: res.data });
          render();     
      });
    } else {
        cookie.remove("token");
        render();
    }


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
