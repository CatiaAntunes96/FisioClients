import React from 'react';
import useSWR from 'swr';
import { url } from '../../../../App';
import { fetchWithToken } from '../../../../App';
import cookie from 'js-cookie';

const SelectFisioForm = ({ handle }) => {
  let token = cookie.get('token');

  const { data, error } = useSWR([url + '/users', token], fetchWithToken);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  function fisioSelected(e) {
    let optionSelected = e.target.value;

    handle(optionSelected);
  }

  return (
    <div>
      <label>Choose Fisio:</label>
      <select name="fisio_list" id="fisio_list" onChange={fisioSelected}>
        {data.map((fisio) => {
          if (fisio.username !== 'Manager') {
            return (
              <option key={fisio.id} value={fisio.id}>
                {fisio.username}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

export default SelectFisioForm;
