import React from "react";
import {Switch, Route, Router} from "react-router-dom";
import Login from "./Login";
import Homepage from "./Homepage";
import Register from "./Register";

const MainRouter = () => (
    <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login} />
        <Route path='/register' component={Register}/>
    </Switch>
)

export default MainRouter;