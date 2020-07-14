import React from 'react';
import useSWR from 'swr';
import { url } from '../../../../App';
import { fetchWithToken } from '../../../../App';
import cookie from 'js-cookie';

import Header from '../../../../Components/Header';
import Footer from '../../../../Components/Footer';

const ClientsList = () => {
  let token = cookie.get('token');

  const { data, error } = useSWR([url + '/clients', token], fetchWithToken);

  console.log(data);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <Header />
      {data.map((client) => (
        <li key={client.id}>{client.Name}</li>
      ))}
      <Footer />
    </div>
  );
};

export default ClientsList;
