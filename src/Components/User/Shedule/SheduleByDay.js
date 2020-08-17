import React from "react";
import moment from "moment";
import {Link} from "react-router-dom";


const SheduleByDay = ({name, hourSession, endDate, id}) => {

    const End_Session =  moment(endDate).format("DD-MM-YYYY")

    return (
        <div>
            <p>8h</p>
            {hourSession === "08:00:00.000" ? <Link to={`/patient/${id}`} >{name} {End_Session}</Link> : ""}
            <p>9h</p>
            {hourSession === "09:00:00.000" ? <Link to={`/patient/${id}`} >{name} {End_Session}</Link> : ""}
            <p>10h</p>
            {hourSession === "10:00:00.000" ? <Link to={`/patient/${id}`}>{name} {End_Session}</Link> : ""}
            <p>11h</p>
            {hourSession === "11:00:00.000" ? <Link to={`/patient/${id}`}>{name} {End_Session}</Link> : ""}
            <p>12h</p>
            {hourSession === "12:00:00.000" ? <Link to={`/patient/${id}`}>{name} {End_Session}</Link> : ""}
            <p>13h</p>
            {hourSession === "13:00:00.000" ? <Link to={`/patient/${id}`}>{name} {End_Session}</Link> : ""}
            <p>14h</p>
            {hourSession === "14:00:00.000" ? <Link to={`/patient/${id}`}>{name} {End_Session}</Link> : ""}
            <p>15h</p>
            {hourSession === "15:00:00.000" ? <Link to={`/patient/${id}`}>{name} {End_Session}</Link> : ""}
            <p>16h</p>
            {hourSession === "16:00:00.000" ? <Link to={`/patient/${id}`}>{name} {End_Session}</Link> : ""}
            <p>17h</p>
            {hourSession === "17:00:00.000" ? <Link to={`/patient/${id}`}>{name} {End_Session}</Link> : ""}
            <p>18h</p>
            {hourSession === "18:00:00.000" ? <Link to={`/patient/${id}`}>{name} {End_Session}</Link> : ""}
        </div>
    )
}

export default SheduleByDay;