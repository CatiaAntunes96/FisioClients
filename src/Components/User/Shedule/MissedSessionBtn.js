import React, {useState} from "react";
import momentWeekDays from "moment-business-days";
import moment from "moment";
import cookie from "js-cookie";
import axios from "axios";

const MissedSession = ({style, patientInfo, session}) => {

    const token = cookie.get("token");

    const patient = patientInfo;

    function addDays () {
        let changedDate = momentWeekDays(patient["End_Date"], 'YYYY-MM-DD').businessAdd(1)._d;
        let formatDate = moment(changedDate).format("YYYY-MM-DD");
        console.log(formatDate);

        let updateEndDate = {...patient, End_Date: formatDate};

        let config = {
            headers: { Authorization: `Bearer ${token}`}
        }

        axios.put(`http://localhost:1337/clients/${patient.id}`, updateEndDate, config)
            .then(response => {
                console.log(response.data)
            })

        session(true)
    }


    return (
        <button style={{backgroundColor: `${style}`}} onClick={addDays}>Not Done</button>
    )
}

export default MissedSession;