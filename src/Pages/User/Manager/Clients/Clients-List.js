import React, { useState, useEffect } from 'react';

import { url } from '../../../../App';
import cookie from 'js-cookie';
import { Link } from 'react-router-dom';

import Header from '../../../../Components/Header';
import Footer from '../../../../Components/Footer';
import SearchBar from '../../../../Components/User/Manager/Clients-List/Search-bar';
import Axios from 'axios';

const ClientsList = () => {
  let token = cookie.get('token');

  const [search, setSearch] = useState('');
  const [clientsList, setClientsList] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);

  //lift up the value from searchBar component
  function handleSearch(value) {
    setSearch(value);
  }

  useEffect(() => {
    Axios.get(url + '/clients', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => setClientsList(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    if (search[0] === ' ') {
      setSearch(search.trimStart());
    }

    if (/^-?[\d.]+(?:e-?\d+)?$/.test(search)) {
      setFilteredClients(
        clientsList.filter((client) => client.id === parseInt(search))
      );
    } else {
      setFilteredClients(
        clientsList.filter((client) =>
          client.Name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [clientsList, search]);

  return (
    <div>
      <Header />
      <SearchBar handleSearch={handleSearch} />
      {filteredClients.map((client) => (
        <Link
          style={{ display: 'flex', justifyContent: 'space-around' }}
          to={`/patient/${client.id}`}
          key={client.id}
        >
          {client.Name} <span>{client.id}</span>
        </Link>
      ))}
      <Footer />
    </div>
  );
};

export default ClientsList;
