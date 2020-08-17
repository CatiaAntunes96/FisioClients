import React from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";
import MainRouter from "./Routing/MainRouter";
import "./Style/App.css";
import axios from "axios";
import cookie from "js-cookie"

export const url = 'http://localhost:1337';
export const fetcher = url => axios.get(url).then(res => res.data);

//let token = cookie.get("token");

export const fetchWithToken = (url, token) => axios.get(url, {
  headers: { Authorization: `Bearer ${token}`}
}).then(res => res.data);

function App() {
  return (
    <div className="App">
      <Router>
        <Route component={MainRouter}/>
      </Router>
    </div>
  );
}

export default App;
