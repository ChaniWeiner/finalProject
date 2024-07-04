import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Volunteer = () => {
    const navigate = useNavigate();

    // בדיקה אם יש ערך קיים בעוגיית ה-TOKEN
    const checkAuth = () => {
        const token = getCookie('token');
        const userId = getCookie('userId');

        // אם קיימים ערכים בעוגייה
        if (token && userId) {
            navigate('/volunteer/volunteers', { state: { userId: userId } });
        }
    };

    // פונקציה לקבלת ערך מעוגייה
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    useEffect(() => {
        // בכניסה לעמוד, בדוק את האוטוריזציה
        checkAuth();
    }, []); // [] כדי להרץ פעם אחת בכניסה לעמוד

    return (
        <>
            <h1>הי ברוכים הבאים</h1>
            <h2>חיכנו לך :)</h2>
            <button onClick={() => { navigate('/register', { state: { userType: "volunteer" } }) }}>הרשמה</button>
            <button onClick={() => { navigate('/login', { state: { userType: "volunteer" } }) }}>כניסה</button>
        </>
    );
};

export default Volunteer;
