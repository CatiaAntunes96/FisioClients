import React from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";
import MainRouter from "./MainRouter";

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
