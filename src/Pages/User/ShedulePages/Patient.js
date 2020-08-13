import React, { useState, useEffect } from 'react';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';
import MissedSessionBtn from '../../../Components/User/Shedule/MissedSessionBtn';
import EditDeceases from '../../../Components/User/Shedule/Edit-deceases';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import cookie from 'js-cookie';
import moment from 'moment';

import { url } from '../../../App';
import { fetchWithToken } from '../../../App';
import useSWR from 'swr';

const Patient = () => {
  let { id } = useParams();

  let token = cookie.get('token');

  const [isDone, setIsDone] = useState(false);
  const [missedSession, setMissedSession] = useState(false);

  const [deceaseListUpdate, setDeceaseListUpdate] = useState([]);

  const { data, error } = useSWR(
    [url + `/clients/${id}`, token],
    fetchWithToken
  );

  const { data: image } = useSWR(
    () => [url + `/upload/files/${data.id}`, token],
    fetchWithToken
  );

  console.log(image);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  if (!image) return <div>loading...</div>;

  console.log(image.url);

  function sessionIsDone() {
    setIsDone(!isDone);
  }

  function missingSession(color) {
    setMissedSession(color);
  }

  function updateDeceaseList(list) {
    setDeceaseListUpdate(list);
  }

  return (
    <div>
      <Header />
      <h4>Name: {data.Name}</h4>
      <p>Age: {data.Age}</p>
      <p>Start Date: {moment(data['Start_Date']).format('DD-MM-YYYY')}</p>
      <p>End date: {moment(data['End_Date']).format('DD-MM-YYYY')}</p>
      <p>Diagnosis: {data.Diagnosis}</p>
      <EditDeceases
        deceases={deceaseListUpdate}
        handleDeceaseChange={updateDeceaseList}
        id={id}
      />
      <p>Exams: {data.Exams}</p>
      <p>Images:</p>
      <img alt={image.name} src={url + image.url} />
      <p>Treatament:</p>
      {data.treatments.map((treatment, i) => (
        <li key={i}>{treatment.Treatment}</li>
      ))}
      {isDone ? (
        <button style={{ backgroundColor: '#4CAF50' }} onClick={sessionIsDone}>
          Done
        </button>
      ) : (
        <button style={{ backgroundColor: '#0d581c' }} onClick={sessionIsDone}>
          Done
        </button>
      )}
      {missedSession ? (
        <MissedSessionBtn
          style={'#c70e00'}
          patientInfo={data}
          session={missingSession}
        />
      ) : (
        <MissedSessionBtn
          style={'#fb1100'}
          patientInfo={data}
          session={missingSession}
        />
      )}
      <Footer />
    </div>
  );
};

export default Patient;
