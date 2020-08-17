import React, {useState} from "react";
import Header from "../../../../Components/Header";
import Form from "../../../../Components/User/Manager/RegisterPatient/Form-register-patient";
import Footer from "../../../../Components/Footer";

const RegisterClient = () => {

    return(
        <div>
            <Header />
            <h2>Register New Client</h2>
            <Form />
            <Footer />
        </div>
    )
}

export default RegisterClient;