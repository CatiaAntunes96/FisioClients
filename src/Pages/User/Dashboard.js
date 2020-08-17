import React from "react";
import {connect} from "react-redux";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import "../../Style/User/Dashboard.css";

const Dashboard = ({name}) => {

    return(
        <div>
          <Header />
            <h1 className="dashboard-presentation">Hi, {name}</h1>
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