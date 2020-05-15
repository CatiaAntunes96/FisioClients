import React from "react";
import {Switch, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import Homepage from "./Homepage";
import Register from "./Register";
import Dashboard from "./User/Dashboard";

const MainRouter = () => (
    <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={Login} />
        <Route path='/register' component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
    </Switch>
)

export default MainRouter;