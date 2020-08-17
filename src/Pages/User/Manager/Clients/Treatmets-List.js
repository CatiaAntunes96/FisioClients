import React, { useState } from 'react';
import useSWR from 'swr';
import { url } from '../../../../App';
import { fetchWithToken } from '../../../../App';
import cookie from 'js-cookie';
import Header from '../../../../Components/Header';
import Footer from '../../../../Components/Footer';
import AddTreatmentForm from '../../../../Components/User/Manager/RegisterPatient/Add-treatment-form';

const TreatmentsList = () => {
  let token = cookie.get('token');

  const [toogleInput, setToogleInput] = useState(false);

  //get the clients list
  const { data, error } = useSWR([url + '/treatments', token], fetchWithToken);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div>
      <Header />
      <h2>Treatments List</h2>
      {data.map((treatment) => (
        <p key={treatment.id}>{treatment.Treatment}</p>
      ))}
      {toogleInput ? (
        <AddTreatmentForm toogle={(state) => setToogleInput(state)} />
      ) : (
        <button onClick={() => setToogleInput(true)}>Add treatment</button>
      )}
      <Footer />
    </div>
  );
};

export default TreatmentsList;
