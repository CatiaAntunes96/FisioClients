import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import cookie from "js-cookie";
import { connect } from "react-redux";

import "../Style/Header.css"
import {IoMdArrowDropdown} from "react-icons/io"

const Header = ({loggedIn, logout, name}) => {
    let history = useHistory();

    function handleLogOut (e) {
        e.preventDefault();    

        cookie.remove("token");
        
        logout();

        history.push("/"); 
    };

    return (
        <div>
            {loggedIn ? 
            name === "Manager" ?
            <div>
                <div className="sidenav"> 
                    <Link to="/dashboard" className="logo-nav">FisioClient</Link>
                    <Link to="/register" className="links">Register Client</Link>
                    {/* <Link to="/shedule" className="links">Shedules</Link> */}
                    <Link to="/notes" className="links">Notes</Link>
                </div>
                <nav>
                    <ul className="header-homepage">
                        <p style={{marginRight: 15}}>{name}</p>
                        <div className="dropdown">
                            <button className="dropbtn">
                                <IoMdArrowDropdown size={25}/>
                            </button>
                            <div className="dropdown-content">
                                <button onClick={handleLogOut} className="links-dropdown">
                                LogOut
                                </button>
                                <Link to="/profile" className="links-dropdown">Profile</Link>
                            </div>
                        </div>
                    </ul>
                </nav>
            </div>
            :
            <div>    
            <div className="sidenav"> 
                    <Link to="/dashboard" className="logo-nav">FisioClient</Link>
                    <Link to="/shedule" className="links">Shedules</Link>
                    <Link to="/notes" className="links">Notes</Link>
            </div>
                <nav >
                <ul className="header-homepage">
                    <p style={{marginRight: 15}}>{name}</p>
                    <div className="dropdown">
                        <button className="dropbtn">
                            <IoMdArrowDropdown size={25}/>
                        </button>
                        <div className="dropdown-content">
                            <button onClick={handleLogOut} className="links-dropdown">
                                LogOut
                            </button>
                            <Link to="/profile" className="links-dropdown">Profile</Link>
                        </div>
                    </div>
                </ul>
            </nav>
            </div>
            : 
            <nav >
                <ul className="header-homepage">
                    <li style={{marginRight: 15}}>
                        <Link to="/login">Login</Link> 
                    </li>
                    <li>
                        <Link to="/register">Register</Link> 
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