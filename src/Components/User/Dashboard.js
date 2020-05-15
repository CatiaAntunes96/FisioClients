import React, {useState} from "react";
import {connect} from "react-redux";
import Header from "../Header";

const Dashboard = ({name}) => {

    const [user, setUser] = useState({
        name: name
      });

      console.log(name)

    return(
        <div>
          <Header />
            Hi, {user.name}
        </div>
    )
}

const mapStateToProps = state => {
    return {
      name: state.auth.user.username
    };
  };
  
  export default connect(mapStateToProps, null) (Dashboard);