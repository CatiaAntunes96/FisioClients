import React, { useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import moment from 'moment';
import momentWeekDays from 'moment-business-days';
import { url } from '../../../../App';

import TreatmentForm from '../RegisterPatient/Treatment-form';

const FormRegisterPatient = () => {
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

  const [treatments, setTreatments] = useState([]);

  function handleTreatments(list) {
    setTreatments(list);
  }

  let token = cookie.get('token');

  function handleChange(e) {
    const value = e.target.value;

    setNewPatient({
      ...newPatient,
      [e.target.name]: value,
    });
  }

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

  const [selectedFile, setSelectedFile] = useState(null);

  function fileChangedHandler(e) {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  async function submitNewPatient(e) {
    e.preventDefault();

    let createPatient = {
      ...newPatient,
      Hour_session: newPatient['Hour_session'] + ':00.000',
      user: {
        id: newPatient.user,
      },
      treatments: treatments,
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      //POST the image on strapi
      const formData = new FormData();

      formData.append('files', selectedFile);

      const uploadImage = await axios.post(url + '/upload', formData, config);
      console.log(uploadImage.data);

      const createUser = await axios.post(
        url + '/clients',
        createPatient,
        config
      );
      console.log(createUser.data);

      if (createUser.data.id) {
        const patient = { ...createUser.data, Exam_images: uploadImage.data };

        const addImage = await axios.put(
          url + `/clients/${createUser.data.id}`,
          patient,
          config
        );
        console.log(addImage);
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
      <label>Associate Fisio:</label>
      <input
        type="number"
        name="user"
        value={newPatient.user}
        onChange={handleChange}
      />
      <TreatmentForm handle={handleTreatments} treatment={treatments} />
      <button type="button" onClick={submitNewPatient}>
        Submit
      </button>
    </form>
  );
};

export default FormRegisterPatient;
