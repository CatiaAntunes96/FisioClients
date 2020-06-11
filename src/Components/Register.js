import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";
import {connect} from "react-redux";

const Register = ({setLogin}) => {

    let history = useHistory();
    
   
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    function handleUsername (e) {
        
        let value = e.target.value;
        
        setUser(user => user = {...user, username: value})
    }

    //Handle Email input
    function handleEmail (e) {
        
        let value = e.target.value;
        
        setUser(user => user = {...user, email: value})
    }

    //Handle Password Input
    function handlePassword (e) {
        
        let value = e.target.value;
        
        setUser(user => user = {...user, password: value})
    }

     //Submit the user data to API
     function handleSubmit (e) {
        
        e.preventDefault();
        
        let userData = {
            username: user.username,
            email: user.email,
            password: user.password
        };
        
        axios.post('http://localhost:1337/auth/local/register', userData)
            .then(response => {
                    cookie.set("token", response.data.jwt);
                    cookie.set("user", response.data.user);

                    console.log('User profile', response.data.user);

                    setLogin(response.data.user)

                    history.push("./dashboard")   
            })
            .catch(error => {
                console.log('An error occurred:', error)
            }) 
    };

    return(
        <div>
            <h2>Create your account</h2>
            <form onSubmit={handleSubmit}>
                <input id="username" type="text" placeholder="Username" required onChange={handleUsername}/>
                <input id="email" type="email" name="email" placeholder="E-mail" required onChange={handleEmail}/>
                <input id="password" type="password" name="password" placeholder="Password" className="form-control" required onChange={handlePassword}/>
                <button type="submit" name="singlebutton">
                    Create Account
                </button>
                </form>
                <p>Already have an account?
                    <Link to="/login"> Log In</Link> <br></br>
                    <span><Link to="/">Back to HomePage</Link></span>
                </p>
        </div>
    )
}

function mapDispatchToProps (dispatch) {
    return {
      setLogin: user => dispatch( { type: "SET_LOGIN", payload: user })
    }
};

export default connect(
   null,
   mapDispatchToProps
)(Register);