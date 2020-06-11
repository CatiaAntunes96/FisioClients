import React from "react";
import {Link} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Homepage = () => {

    return(
        <div>
            <Header />
            <h1>FisioClient</h1>
            <h4>An app to facilitate your client's management</h4>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Footer />
        </div>
    )
}

export default Homepage;