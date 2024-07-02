import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Login.css';
import { useLocation } from 'react-router-dom';

const Login = () => {
    const location = useLocation();
    const userType = location.state.userType;
    const [userId, setId] = useState(0);
    const [Login, setLogin] = useState("none");
    const navigate = useNavigate();

    const login = (data) => {
        getUserFromDb(data.userId, data.password);
        setId(data.userId);
    }

    function getUserFromDb(userId, password) {
        fetch(`http://localhost:8082/volunteer/login`, {
            headers: { 'Content-Type': 'application/json', 'charset': 'UTF-8' },
            method: 'POST',
            body: JSON.stringify({
                userId: userId,
                password: password
            })
        })
        .then(result => result.json())
        .then(data => {
            if (data.status === 200) {
                let user = data["data"];
                let token = data["token"]; // קבלת ה-Token מהשרת
                setLogin("inline");
                alert(123);

                // שמירת ה-Token בעוגיה או localStorage
                document.cookie = `token=${token}; path=/;`;

                // ניתוב על פי סוג המשתמש
                userType === "volunteer"
                    ? navigate(`/volunteer/volunteers`, { state: { userId: userId } })
                    : navigate(`/helpRequest/requests`, { state: { userId: userId } });
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

    const { reset, register, handleSubmit, formState: { errors } } = useForm();

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
                userType === "volunteer"
                    ? navigate('/volunteer/login', { state: { userType: "volunteer" } })
                    : navigate('/helpRequest/login', { state: { userType: "request" } });
            }}>כניסה</button>
        </>
    );
}

export default Login;
