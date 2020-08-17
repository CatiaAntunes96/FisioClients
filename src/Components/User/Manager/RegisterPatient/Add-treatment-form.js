import React, { useState } from 'react';
import useSWR, { mutate, trigger } from 'swr';
import axios from 'axios';
import { url } from '../../../../App';
import { fetchWithToken } from '../../../../App';
import cookie from 'js-cookie';

const AddTreatmentForm = ({ toogle }) => {
  let token = cookie.get('token');

  const [addTreatment, setAddTreatment] = useState('');

  const { data } = useSWR([url + '/treatments', token], fetchWithToken);

  return (
    <div>
      <input
        type="text"
        value={addTreatment}
        onChange={(e) => {
          setAddTreatment(e.target.value);
        }}
      />
      <button
        onClick={async () => {
          mutate(url + '/treatments', [...data, addTreatment], false);
          const newTreatment = { Treatment: addTreatment };
          try {
            const response = await axios.post(
              url + '/treatments',
              newTreatment,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (response) {
              trigger(url + '/treatments');
            }
          } catch (error) {
            console.log(error);
          }

          toogle(false);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddTreatmentForm;
