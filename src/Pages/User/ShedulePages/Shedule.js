import React, {useState, useEffect} from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

import "../../../Style/User/Shedule/Shedule.css"

import moment from "moment";

import WeekNav from "../../../Components/User/Shedule/WeekNav";
import SheduleByDay from "../../../Components/User/Shedule/SheduleByDay";


const Shedule = () => {

    const [weekDates, setWeekDates] = useState([]);

    //Display week days
   let days = [1, 2, 3, 4, 5]

   let isWeekDay = moment().isoWeekday(); //confirms if the present day is a week day

   let today = moment().format("YYYY-MM-DD"); //gives the present date day

   let weekYear = moment(today).weeks(); //get the week`year number

    function getWeekDates () {
        
            setWeekDates(days.map(d => moment('2020-' + weekYear + '-' + d, 'YYYY-W-E').format("YYYY-MM-DD")));
        
    }

    useEffect(() => {
        getWeekDates();
    }, []);

    //Get the day selected
    const [getDay, setGetDay] = useState("");

    function setDay (day) {
        setGetDay(day)
    }

    console.log(getDay);

    //Get the shedule of the day
    const [patientsList, setPatientsList] = useState([]);

    function getPatientList (list) {
        setPatientsList(list)
    }

    return(
        <div>
            <Header />
            <h2 className="shedule-title">Shedule</h2>
            
            <div className="nav-dates">
            {weekDates.map((day, i) => (
                <WeekNav key={i} day={day} getDaySelected={setDay} getPatients={getPatientList} /> 
            ))}
            </div>
            {patientsList.map((patient, i) => (
                <SheduleByDay key={i} name={patient.Name} id={patient.id} hourSession={patient["Hour_session"]} endDate={patient["End_Date"]} />
            ))}
            <Footer />
        </div>
    )
}

  export default Shedule;