import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie'; // ייבוא הספריה
import ForgotPassword from './ForgotPassword';
const Login = () => {
    const location = useLocation();
    const userType = location.state?.userType || 'profile';
    const [userId, setId] = useState('');
    const [loginStatus, setLoginStatus] = useState("none");
    const navigate = useNavigate();
    const { reset, register, handleSubmit, formState: { errors } } = useForm();

    const login = (data) => {
        getUserFromDb(data.userId, data.password);
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
                Cookies.set('token', token, { secure: true, sameSite: 'strict' });

                // שמירת ה-UserID בקוקיז
                Cookies.set('userId', userId, { secure: true, sameSite: 'strict' });

                // ניתוב על פי סוג המשתמש
                if (userType === "volunteer") {
                    navigate(`/volunteer/volunteers`, { state: { userId: userId } });
                } else if (userType === "helpRequest") {
                    navigate(`/helpRequest/requests`, { state: { userId: userId } });
                } else {
                    navigate(`/profile`, { state: { userId: userId } });
                }
            } else {
                alert("User does not exist. Please sign up.");
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
                <h2>Sign in</h2>
                <input type='text' placeholder='User ID' {...register("userId", { required: true })} />
                <input type='password' placeholder='Password' {...register("password", { required: true })} />
                <input type="submit" value="Sign in" />

                {errors.userId && errors.userId.type === "required" && (
                    <p className="errorMsg">User ID is required.</p>
                )}
                {errors.password && errors.password.type === "required" && (
                    <p className="errorMsg">Password is required.</p>
                )}
            </form>

            <button onClick={() => {
                navigate("/register", { state: { userType: userType } });
            }}>Register</button>
            <ForgotPassword userId={userId} />
        </>
    );
}

export default Login;
