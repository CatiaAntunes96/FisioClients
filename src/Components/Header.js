import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import cookie from "js-cookie";
import { connect } from "react-redux";

const Header = ({loggedIn, logout, name}) => {
    let history = useHistory();

    //let token = cookie.get("token");

    function handleLogOut (e) {
        e.preventDefault();    

        cookie.remove("token");
        
        logout();

        history.push("/"); 
    };

    return (
        <div>
            {loggedIn ? 
            <div >
                <p>{name}</p>
            <nav >
            
            <ul>
                <button onClick={handleLogOut}>
                    LogOut
                </button>
            </ul>
            </nav>
            </div>
            : 
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Login</Link> 
                    </li>
                    <li>
                        <Link to="/Register">Register</Link> 
                    </li>
                </ul>
            </nav> 
            }
        </div>
    )
};

const mapStateToProps = state => {
    return {
      loggedIn: state.auth.loggedIn,
      name: state.auth.user.username
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch({ type: "SET_LOGOUT" })
    };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);