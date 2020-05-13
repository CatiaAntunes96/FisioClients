import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import cookie from "js-cookie";
import axios from "axios";

const Login = () => {
    let history = useHistory();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    function handleEmail(e) {
        let value = e.target.value;
        setUser(user => user = {...user, email: value})
    }

    function handlePassword (e) {
        let value = e.target.value;
        setUser(user => user = {...user, password: value})
    }

    function handleSubmit (e) {
        e.preventDefault();  
        
        let userData = {
            email: user.email,
            password: user.password
        };

        axios.post('', userData)
            .then(response => {
                history.push('/');

                cookie.set("token", response.data.access_token);

                //setLogin(response.data)

                console.log(response)
            })
            .catch(error => {
                console.log(error)
                return error;
        })  
    }

    return(
        <div>
            <h2>Login in to your account</h2>
            <form>
                <input id="email" type="email" name="email" placeholder="E-mail" onChange={handleEmail} required />
                <input id="password" type="password" name="password" placeholder="Password" onChange={handlePassword} required />
                <input type="submit" name="singlebutton" placeholder="Submit" />
            </form>
        </div>
    )
}

export default Login;