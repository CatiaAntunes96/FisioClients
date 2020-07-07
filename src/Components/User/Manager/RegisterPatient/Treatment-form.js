import React, { useState } from 'react';
import useSWR from 'swr';
import { url } from '../../../../App';
import { fetchWithToken } from '../../../../App';
import cookie from 'js-cookie';

const TreatmentForm = () => {
  let token = cookie.get('token');

  const { data, error } = useSWR([url + '/treatments', token], fetchWithToken);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <label>Choose treatments:</label>
      <select
        name="treatments"
        id="treatments"
        multiple="multiple"
        onMouseLeave={() => {
          const selected = [...document.querySelector('select').options]
            .filter((option) => option.selected)
            .map((option) => option.value);

          return selected;
        }}
      >
        {data.map((treatment) => (
          <option key={treatment.id} value={treatment.Treatment}>
            {treatment.Treatment}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TreatmentForm;
