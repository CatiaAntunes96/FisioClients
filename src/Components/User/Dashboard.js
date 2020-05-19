import React, {useState} from "react";
import {connect} from "react-redux";
import Header from "../Header";
import Footer from "../Footer";
import "../../Style/User/Dashboard.css"

const Dashboard = ({name}) => {

    const [user, setUser] = useState({
        name: name
      });

      console.log(name)

    return(
        <div>
          <Header />
            <h1 className="dashboard-presentation">Hi, {user.name}</h1>
          <Footer />
        </div>
    )
}

const mapStateToProps = state => {
    return {
      name: state.auth.user.username
    };
  };
  
  export default connect(mapStateToProps, null) (Dashboard);