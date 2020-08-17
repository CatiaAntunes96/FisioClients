import React, {useState, useRef} from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import {connect} from "react-redux";
import cookie from "js-cookie";
import axios from "axios";

import "../../Style/User/Profile.css";

const Profile = ({id, name, email, update}) => {

    const [editMode, setEditMode] = useState(false);

    let token = cookie.get("token");

    const editName = useRef(name);

    function usernameUpdate() {
        let user = editName.current.value;
        return user;
    }

    async function editProfile () {
       
        const user = {
            username: usernameUpdate()
        }

        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        
        const response = await axios.put(`http://localhost:1337/users/${id}`, user, config);
        console.log(response);
        
        setEditMode(false);

        update(response.data);
    }

    function activateInput () {
        setEditMode(true)
    }

    //JSX components
    const editUsername = 
    <div>
        <input type="text" defaultValue={name} ref={editName} />
    </div>;

    const editBtn = <button onClick={activateInput}>Edit</button>

    const saveBtn = <button onClick={editProfile}>Save</button>

    const activateIncputCamp = editMode ? <div>{editUsername}{saveBtn}</div> :
    <div>{name}{editBtn}</div>;


    return(
        <div>
            <Header />
            <h2 className="profile-title">Profile</h2>
            <p>UserName: </p>
                <span>{activateIncputCamp}</span>
            <p>Email: {email}</p>
            <Footer />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        id: state.auth.user.id,
        name: state.auth.user.username,
        email: state.auth.user.email
    };
  };

  function mapDispatchToProps (dispatch) {
    return {
      update: user => dispatch( { type: "UPDATE", payload: user })
    }
};
  
  export default connect(mapStateToProps, mapDispatchToProps) (Profile);