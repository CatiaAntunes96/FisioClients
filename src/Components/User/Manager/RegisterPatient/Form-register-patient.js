import React, { useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import moment from 'moment';
import momentWeekDays from 'moment-business-days';
import { url } from '../../../../App';
import { useHistory } from 'react-router-dom';

import TreatmentForm from '../RegisterPatient/Treatment-form';
import SelectFisioForm from './Select-Fisio-form';

const FormRegisterPatient = () => {
  let history = useHistory();

  const [newPatient, setNewPatient] = useState({
    Name: '',
    Age: '',
    Date_Birth: '',
    Previous_diseases: '',
    Exams: '',
    Diagnosis: '',
    Start_Date: '',
    End_Date: '',
    Hour_session: '',
    user: '',
  });

  //Allows to lifting up the state from Treatment-form component
  const [treatments, setTreatments] = useState([]);

  function handleTreatments(list) {
    setTreatments(list);
  }

  //Allows to lifting up the state from SelectFisioForm component
  const [fisio, setFisio] = useState('');

  function handleFisio(user) {
    setFisio(user);
  }

  //Allows to handle the changes on the multiple inputs and register on the newPatient object
  function handleChange(e) {
    const value = e.target.value;

    setNewPatient({
      ...newPatient,
      [e.target.name]: value,
    });
  }

  //Define the end date of the patient
  function defineEnd_date() {
    if (newPatient['Start_Date'] !== '') {
      let date = momentWeekDays(
        newPatient['Start_Date'],
        'YYYY-MM-DD'
      ).businessAdd(14)._d;

      let endDate = moment(date).format('YYYY-MM-DD');

      setNewPatient({ ...newPatient, End_Date: endDate });

      console.log(moment(date).format('YYYY-MM-DD'));
    }
  }

  //Allows to handle the image selected from the exam images input
  const [selectedFile, setSelectedFile] = useState(null);

  function fileChangedHandler(e) {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  //On submit function
  async function submitNewPatient(e) {
    debugger;
    e.preventDefault();

    //Allow to format the hours for strapi and adds the treatments selected
    let createPatient = {
      ...newPatient,
      Hour_session: newPatient['Hour_session'] + ':00.000',
      treatments: treatments,
    };

    //Headers for the request
    let token = cookie.get('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      //POST the image on strapi
      const formData = new FormData();

      formData.append('files', selectedFile);

      const uploadImage = await axios.post(url + '/upload', formData, config);

      const createUser = await axios.post(
        url + '/clients',
        createPatient,
        config
      );

      if (createUser.data.id) {
        const patient = { ...createUser.data, Exam_images: uploadImage.data };

        const addImage = await axios.put(
          url + `/clients/${createUser.data.id}`,
          patient,
          config
        );

        history.push('/dashboard');

        console.log('Success!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form>
      <label>Name:</label>
      <input
        type="text"
        name="Name"
        value={newPatient.Name}
        onChange={handleChange}
      />
      <label>Age:</label>
      <input
        type="number"
        name="Age"
        value={newPatient.Age}
        onChange={handleChange}
      />
      <label>Birth Date:</label>
      <input
        type="date"
        name="Date_Birth"
        value={newPatient['Date_Birth']}
        onChange={handleChange}
      />
      <label>Previous Deceases:</label>
      <input
        type="text"
        name="Previous_diseases"
        value={newPatient['Previous_diseases']}
        onChange={handleChange}
      />
      <label>Diagnosis:</label>
      <input
        type="text"
        name="Diagnosis"
        value={newPatient.Diagnosis}
        onChange={handleChange}
      />
      <label>Exams:</label>
      <input
        type="text"
        name="Exams"
        value={newPatient.Exams}
        onChange={handleChange}
      />
      <label>Exams Images:</label>
      <input type="file" name="Exam_images" onChange={fileChangedHandler} />
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          name="Start_Date"
          value={newPatient['Start_Date']}
          onChange={handleChange}
          onMouseOut={defineEnd_date}
        />
      </div>
      <label>End Date:</label>
      <span>{newPatient['End_Date']}</span>
      <label>Session Hour:</label>
      <input
        type="time"
        name="Hour_session"
        value={newPatient['Hour_session']}
        onChange={handleChange}
      />
      <SelectFisioForm handle={handleFisio} />
      <TreatmentForm handle={handleTreatments} />
      <button type="button" onClick={submitNewPatient}>
        Submit
      </button>
    </form>
  );
};

export default FormRegisterPatient;
