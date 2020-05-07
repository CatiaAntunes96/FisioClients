import React from "react";
import {Switch, Route, Router} from "react-router-dom";

const MainRouter = () => (
    <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login} />
        <Route path='/register' component={Register}/>
    </Switch>
)

export default MainRouter;