import React from 'react';
import useSWR from 'swr';
import { url } from '../../../../App';
import { fetchWithToken } from '../../../../App';
import cookie from 'js-cookie';
import { Link } from 'react-router-dom';

import Header from '../../../../Components/Header';
import Footer from '../../../../Components/Footer';
import SearchBar from '../../../../Components/User/Manager/Clients-List/Search-bar';

const ClientsList = () => {
  let token = cookie.get('token');

  const { data, error } = useSWR([url + '/clients', token], fetchWithToken);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <Header />
      <SearchBar />
      {data.map((client) => (
        <Link
          style={{ display: 'flex', justifyContent: 'space-around' }}
          to={`/patient/${client.id}`}
        >
          <li key={client.id}>{client.Name}</li>
          <span>{client.id}</span>
        </Link>
      ))}
      <Footer />
    </div>
  );
};

export default ClientsList;
