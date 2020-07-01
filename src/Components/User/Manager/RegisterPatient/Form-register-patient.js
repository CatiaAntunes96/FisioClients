import React, {useState, useEffect} from "react";
import axios from "axios";
import cookie from "js-cookie";

const FormRegisterPatient = () => {

    const [newPatient, setNewPatient] = useState({
        Reference_number: "", //the number has to generate automatically
        Name: "",
        Age: "",
        Date_Birth: "",
        Previous_diseases: "",
        Exams: [],
        Exam_images: [],
        Diagnosis: "",
        Start_Date: "",
        End_Date: "",
        Hour_session: "",
        treatments: []
    });

    function handleChange(e) {
        const value = e.target.value;
        setNewPatient({
          ...newPatient,
          [e.target.name]: value
        });
      }

      console.log(newPatient)

     


    return(
        <form>
            <label>Name:</label><input type="text" name="Name" value={newPatient.Name} onChange={handleChange} />
            <label>Age:</label><input type="number" name="Age" value={newPatient.Age} onChange={handleChange} />
            <label>Birth Date</label><input type="date" name="Date_Birth" value={newPatient["Date_Birth"]} onChange={handleChange} />
        </form>
    )
}

export default FormRegisterPatient;