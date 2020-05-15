import React, {useState} from "react";
import {useHistory, Link} from "react-router-dom";
import cookie from "js-cookie";
import axios from "axios";
import {connect} from "react-redux";

const Login = ({setLogin}) => {
    let history = useHistory();

    const [user, setUser] = useState({
        identifier: '',
        password: ''
    });

    function handleUsername(e) {
        let value = e.target.value;
        setUser(user => user = {...user, identifier: value})
    }

    function handlePassword (e) {
        let value = e.target.value;
        setUser(user => user = {...user, password: value})
    }

    function handleSubmit (e) {
        e.preventDefault();  
        
        let userData = {
            identifier: user.identifier,
            password: user.password
        };

        axios.post('http://localhost:1337/auth/local', userData)
            .then(response => {
                

                cookie.set("token", response.data.jwt);

                setLogin(response.data.user)

                console.log(response.data)

                history.push('/dashboard');
            })
            .catch(error => {
                console.log(error)
                return error;
        })  
    }

    return(
        <div>
            <h2>Login in to your account</h2>
            <form onSubmit={handleSubmit}>
                <input id="username" name="username" type="text" placeholder="Username" onChange={handleUsername} required />
                <input id="password" type="password" name="password" placeholder="Password" onChange={handlePassword} required />
                <input type="submit" name="singlebutton" placeholder="Submit" />
            </form>
            <p className="pt-3">Don't have an account? <Link to="/register" className="text-yellow"> Register</Link></p>
        </div>
    )
}

function mapDispatchToProps (dispatch) {
    //debugger
    return {
      setLogin: user => dispatch( { type: "SET_LOGIN", payload: user })
    }
};

export default connect(
   null,
   mapDispatchToProps
)(Login);