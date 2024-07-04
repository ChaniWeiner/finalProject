import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ForgotPassword from './ForgotPassword'; // ייבוא הקומפוננטה החדשה

const Login = () => {
    const location = useLocation();
    const userType = location.state?.userType || 'profile';
    const [userId, setId] = useState(0);
    const [loginStatus, setLoginStatus] = useState("none");
    const navigate = useNavigate();
    const { reset, register, handleSubmit, formState: { errors } } = useForm();

    const login = (data) => {
        getUserFromDb(data.userId, data.password);
        setId(data.userId);
    }

    function getUserFromDb(userId, password) {
        fetch(`http://localhost:8082/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'charset': 'UTF-8'
            },
            body: JSON.stringify({
                userId: userId,
                password: password
            })
        })
        .then(result => result.json())
        .then(data => {
            if (data.status === 200) {
                let token = data.data.token; // קבלת ה-Token מהשרת
                setLoginStatus("inline");

                // שמירת ה-Token בקוקיז
                document.cookie = `token=${token}; path=/; secure; samesite=strict`; // secure ו-HttpOnly מומלץ להוסיף לאבטחה נוספת

                // ניתוב על פי סוג המשתמש
                if (userType === "volunteer") {
                    navigate(`/volunteer/volunteers`, { state: { userId: userId } });
                } else if (userType === "helpRequest") {
                    navigate(`/helpRequest/requests`, { state: { userId: userId } });
                } else {
                    navigate(`/profile`, { state: { userId: userId } });
                }
            } else {
                alert("user does not exist please sign up");
            }
            reset();
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            alert("Error logging in. Please try again later.");
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit(login)}>
                <h2>sign in</h2>
                <input type='text' placeholder='userId' {...register("userId", { required: true })} />
                <input type='password' placeholder='password' {...register("password", { required: true })} />
                <input type="submit" value="sign in" />

                {errors.userId && errors.userId.type === "required" && (
                    <p className="errorMsg">userId is required.</p>
                )}
                {errors.password && errors.password.type === "required" && (
                    <p className="errorMsg">Password is required.</p>
                )}
            </form>

            <button onClick={() => {
               navigate("/register", { state: { userType: userType } });
            }}>הרשמה</button>
            <ForgotPassword userId={userId} />
        </>
    );
}

export default Login;
