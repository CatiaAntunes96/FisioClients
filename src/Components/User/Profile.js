import React from "react";
import Header from "../Header";
import Footer from "../Footer";

import "../../Style/User/Profile.css";

const Profile = () => {

    return(
        <div>
            <Header />
            <h2 className="profile-title">Profile</h2>
            <Footer />
        </div>
    )
}

export default Profile;