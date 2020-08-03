import React, { useState } from 'react';
import useSWR, { mutate, trigger } from 'swr';
import { url } from '../../../../App';
import { fetchWithToken } from '../../../../App';
import cookie from 'js-cookie';
import axios from 'axios';

const TreatmentForm = ({ handle }) => {
  let token = cookie.get('token');

  const [toogleInput, setToogleInput] = useState(false);
  const [addTreatment, setAddTreatment] = useState('');

  const { data, error } = useSWR([url + '/treatments', token], fetchWithToken);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  function treatmentsSelected(e) {
    let options = e.target.options;
    let list = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        list.push(options[i].value);
      }
    }
    handle(list);
  }

  return (
    <div>
      <label>Choose treatments:</label>
      <select
        name="treatments"
        id="treatments"
        multiple={true}
        onChange={treatmentsSelected}
      >
        {data.map((treatment) => (
          <option key={treatment.id} value={treatment.id}>
            {treatment.Treatment}
          </option>
        ))}
        <option onClick={() => setToogleInput(true)}>Add treatment</option>
      </select>
      {toogleInput ? (
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

              setToogleInput(false);
            }}
          >
            Add
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default TreatmentForm;
