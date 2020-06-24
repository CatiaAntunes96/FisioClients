import React from "react";
import {Switch, Route} from "react-router-dom";

import Login from "../Pages/Login";
import Homepage from "../Pages/Homepage";
import Register from "../Pages/Register";
import Dashboard from "../Pages/User/Dashboard";
import Profile from "../Pages/User/Profile";
import Shedule from "../Pages/User/ShedulePages/Shedule";
import Patient from "../Pages/User/ShedulePages/Patient";

import PrivateRoute from "./PrivateRoute"

const MainRouter = () => (
    <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={Login} />
        <Route path='/register' component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/shedule" component={Shedule} />
        <PrivateRoute path="/patient/:id" component={Patient} />
    </Switch>
)

export default MainRouter;