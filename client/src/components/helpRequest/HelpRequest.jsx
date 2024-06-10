import React from "react"; 
import { useNavigate } from "react-router-dom";

const HelpRequest = () => {
    const navigate = useNavigate();
    // useEffect(() => {
    //     navigate('/volunteer/login');
    //   }, []);

    return (
        <>
            <h1>הי אחותי </h1>
            <h2>חיכנו לך:)</h2>
            <button onClick={() => {  navigate('/helpRequest/register', { state: { userType: "helpRequest" }}) }} >הרשמה</button>
            <button onClick={() => { navigate('/helpRequest/login', { state: { userType: "helpRequest" }}) }} >כניסה</button>
        </>
    );
}

export default HelpRequest;