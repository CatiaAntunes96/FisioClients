import React, { useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import moment from 'moment';
import momentWeekDays from 'moment-business-days';
import { url } from '../../../../App';

import { fetchWithToken } from '../../../../App';
import useSWR from 'swr';

const FormRegisterPatient = () => {
  const [newPatient, setNewPatient] = useState({
    Name: '',
    Age: '',
    Date_Birth: '',
    Previous_diseases: '',
    Exams: [],
    Exam_images: [],
    Diagnosis: '',
    Start_Date: '',
    End_Date: '',
    Hour_session: '',
  });

  const [treatments, setTreatments] = useState([]);

  let token = cookie.get('token');

  const { data, error } = useSWR([url + '/treatments', token], fetchWithToken);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

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

  async function submitNewPatient() {
    let createPatient = {
      ...newPatient,
      Hour_session: newPatient['Hour_session'] + ':00.000',
      treatments: treatments,
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await axios.post(url + '/clients', createPatient, config);
    console.log(response);
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
      <input
        type="image"
        name="Exam_images"
        value={newPatient['Exam_images']}
        alt={newPatient['Exam_images']}
        onChange={handleChange}
      />
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
      <label>Choose treatments:</label>
      <select
        name="treatments"
        id="treatments"
        multiple="multiple"
        onMouseLeave={() => {
          const selected = [...document.querySelector('select').options]
            .filter((option) => option.selected)
            .map((option) => option.value);

          setTreatments(selected);

          console.log(selected);
        }}
      >
        {data.map((treatment) => (
          <option key={treatment.id} value={treatment.Treatment}>
            {treatment.Treatment}
          </option>
        ))}
      </select>
      <button type="button" onClick={submitNewPatient}>
        Submit
      </button>
    </form>
  );
};

export default FormRegisterPatient;
