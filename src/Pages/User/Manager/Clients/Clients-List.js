import React from "react";
import axios from "axios"; 
import useSWR from "swr";
import {url} from "../../../../App";
import {fetchWithToken} from "../../../../App";
import cookie from "js-cookie";

const ClientsList = () => {
    let token = cookie.get("token");
  

    const {data, error} = useSWR([url + '/clients', token], fetchWithToken);

    console.log(data)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

      

    return(
        <div>
            {data.map(client => (
                <li key={client.id}>{client.Name}</li>
            ))}
       
        </div>
    )
}

export default ClientsList;