import React from "react";
import axios from "axios";
import {connect} from "react-redux";

import cookie from "js-cookie";

import "../../../Style/User/Shedule/SheduleByDay.css";


const WeekNav = ({day, getDaySelected, getPatients, id}) => {

    //lift the patients list to the parent component
    let token = cookie.get("token");

    function getPatientsList (e) {
        e.preventDefault();
     
        getDaySelected(day);

        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }

        axios.get(`http://localhost:1337/users/${id}`, config)
            .then(response => {
                let user = response.data;
                
                let clients = user.clients;
                
                let filterClients = clients.filter(client => {
                
                    if ( (client["End_Date"] >= day && client["Start_Date"] <= day)) {
                        return client
                }
            })

            getPatients(filterClients);
        })
    }

    return (
        <div>
            <button className="dates">{day}</button>
            <button onClick={getPatientsList}>Click Me</button>
            <div>
           
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        id: state.auth.user.id,
    };
  };


export default connect(mapStateToProps, null) (WeekNav);