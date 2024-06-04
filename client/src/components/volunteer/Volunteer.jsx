import React from "react"; 

import Login from "../login/Login";
import Register from "../register/Register";
import { useNavigate } from "react-router-dom";

const Volunteer = () => {
    const navigate = useNavigate();
    // useEffect(() => {
    //     navigate('/volunteer/login');
    //   }, []);

    return (
        <>
            <h1>הי ברוכים הבאים </h1>
            <h2>חיכנו לך:)</h2>
            <button onClick={() => { navigate('/volunteer/register') }} >הרשמה</button>
            <button onClick={() => { navigate('/volunteer/login') }} >כניסה</button>
        </>
    );
}

export default Volunteer;
