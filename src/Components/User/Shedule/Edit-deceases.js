import React, {useState, useRef} from "react";
import axios from "axios";
import {connect} from "react-redux";
import cookie from "js-cookie";

const EditDeceases = ({deceases, update, id}) => {
    const [editMode, setEditMode] = useState(false);

    let token = cookie.get("token");

    const editDeceases = useRef(deceases);

    function deceasesListUpdate() {
        let deceases = editDeceases.current.value;
        return deceases;
    }

    async function editInformation () {
       
        const deceasesList = {
            Previous_diseases: deceasesListUpdate()
        }

        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        
        const response = await axios.put(`http://localhost:1337/clients/${id}`, deceasesList, config);
        console.log(response);
        
        setEditMode(false);

        update(response.data);
    }

    function activateInput () {
        setEditMode(true)
    }

    //JSX components
    const editDeceasesList = 
    <div>
        <input type="text" defaultValue={deceases} ref={editDeceases} />
    </div>;

    const editBtn = <button onClick={activateInput}>Edit</button>

    const saveBtn = <button onClick={editInformation}>Save</button>

    const activateInputCamp = editMode ? <div>{editDeceasesList}{saveBtn}</div> :
    <div>{deceases}{editBtn}</div>;

    return(
        <div>Previous Deceases: {activateInputCamp}</div>
    
    )
}

function mapDispatchToProps (dispatch) {
    return {
      update: user => dispatch( { type: "UPDATE", payload: user })
    }
};

export default connect (null, mapDispatchToProps)(EditDeceases);