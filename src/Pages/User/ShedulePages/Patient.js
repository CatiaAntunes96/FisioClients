import React, {useState, useEffect} from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import MissedSessionBtn from "../../../Components/User/Shedule/MissedSessionBtn";
import EditDeceases from "../../../Components/User/Shedule/Edit-deceases";

import axios from "axios";
import {useParams} from "react-router-dom";
import cookie from "js-cookie";
import moment from "moment";

const Patient = () => {
    let { id } = useParams();

    let token = cookie.get("token");

    const [patient, setPatient] = useState({});
    const [treatments, setTreatments] = useState([]);
    const [isDone, setIsDone] = useState(false);
    const [missedSession, setMissedSession] = useState(false);
    
    function getPatient () {
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }

        axios.get(`http://localhost:1337/clients/${id}`, config) 
            .then(response => {
                console.log(response.data)

                setPatient(response.data);

                setTreatments(response.data.treatments);

            })
    }

    useEffect(() => {
        getPatient();
    }, [])    

   function sessionIsDone () {
       setIsDone(!isDone);
   }

   function missingSession (color) {
       setMissedSession(color);
   }

    return(
        <div>
            <Header />
                <h4>Name: {patient.Name}</h4>
                <p>Age: {patient.Age}</p>
                <p>Start Date: {moment(patient["Start_Date"]).format("DD-MM-YYYY")}</p>
                <p>End date: {moment(patient["End_Date"]).format("DD-MM-YYYY")}</p>
                <p>Diagnosis: {patient.Diagnosis}</p>
                <EditDeceases deceases={patient["Previous_diseases"]} id={id} />
                <p>Exams: {patient.Exams}</p>
                <p>Images: {patient["Exams_images"]}</p>
                <p>Tratamento:</p>
                {treatments.map((treatment, i) => (
                    <li key={i}>{treatment.Treatment}</li>
                ))}
                {isDone ? <button style={{backgroundColor: "#4CAF50"}} onClick={sessionIsDone}>Done</button> : <button style={{backgroundColor: "#0d581c"}} onClick={sessionIsDone}>Done</button>}
                {missedSession ? <MissedSessionBtn style={"#c70e00"} patientInfo={patient} session={missingSession} /> : <MissedSessionBtn style={"#fb1100"} patientInfo={patient} session={missingSession}/>}
            <Footer />
        </div>
    )
}

export default Patient;