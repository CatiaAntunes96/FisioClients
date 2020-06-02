import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";
import cookie from "js-cookie";

import "../../Style/User/Shedule.css";
import moment from "moment";
import momentWeekDays from "moment-business-days";

const Shedule = () => {

    let token = cookie.get("token");

     //allow to add just week days
    //Missing:
    //- Get start date from client and add 15 sessions or more
    //-Parse the given start date to "MMM Do YYYY"
    //-Add holidays

    //Add days
    let today = moment().format("DD MM YY");

    let date = momentWeekDays(today, 'DD-MM-YYYY').businessAdd(7)._d;
    console.log(moment(date).format("DD MM YY"));

   
    //Display week days
   let days = [1, 2, 3, 4, 5]

   let weekDates = [];

   let isWeekDay = moment().isoWeekday()

   console.log(isWeekDay);

   let weekYear = 23;

    function getWeekDates () {
        if (isWeekDay === 1) {
            weekYear += 1
            weekDates = days.map(d => moment('2020-' + weekYear + '-' + d, 'YYYY-W-E').format("DD MM YY"));
            return weekDates;
        } else {
            weekDates = days.map(d => moment('2020-' + weekYear + '-' + d, 'YYYY-W-E').format("DD MM YY"));
            return weekDates;
        }
    }

    console.log(getWeekDates())


    function click (e) {
        e.preventDefault();  

        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }

        axios.get('http://localhost:1337/users/2', config)
            .then(response => {
                let user = response.data;
                console.log(user.clients)
                let clients = user.clients;
                let filterClients = clients.filter(client => {
                    return client.Start_Date === "2020-06-01"
                })

                console.log(filterClients)
            })
    }

    return(
        <div>
            <Header />
            <h2 className="shedule-title">Shedule</h2>
            <button onClick={click}>Click Me</button>
            <div className="nav-dates">
                {weekDates.map((day, i) => (
                    <button key={i} className="dates">{day}</button>
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default Shedule;