import React from "react";
import {Link} from "react-router-dom";

const Homepage = () => {

    return(
        <div>
            <h1>FisioClient</h1>
            <h4>An app to facilitate your client's management</h4>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Homepage;