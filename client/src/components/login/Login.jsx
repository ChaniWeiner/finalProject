
import React from 'react';
import { useNavigate,Navigate } from "react-router-dom";
import { useContext } from 'react';
  
//import { currentUserContext } from '../Main'
import { useForm } from 'react-hook-form';
import './Login.css';
const Login=() =>{
    
   // const [user, setUser] = useContext(currentUserContext);
    const navigate = useNavigate();

    const login=(data) =>{
        getUserFromDb(data.userId, data.password);
    }

    function getUserFromDb(userId, password) {
        fetch(`http://localhost:8082/volunteer/login`,
            {
                headers: { 'Content-Type': 'application/json', 'charset': 'UTF-8' },
                method: 'POST',
                body: JSON.stringify({
                    userId: userId,
                    password: password
                })
            })
            .then(result=>result.json())
            .then(data => {
                if (data.status == 200) {
                    let user = data["data"]
                 
                    //setUser(user)
                    //localStorage.setItem("user", (JSON.stringify({ userId: user.id, username: user.username })))
                 
                   navigate('volunteers');
                  
                   
                    alert("123")
                }
                else alert("user does not exist please sign up")
                reset()
            })
    }


    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <>
            <form onSubmit={handleSubmit(login)}>
                <h2>sign in</h2>
                <input type='text' placeholder='userId' {...register("userId", { required: true })} />
                <input type='password' placeholder='password' {...register("password", { required: true })} />
                <input type="submit" value="sign in" />
                {errors.userId && errors.userId.type === "required" && (
                    <p className="errorMsg">userId is required.</p>)}
                {errors.password && errors.password.type === "required" && (
                    <p className="errorMsg">Password is required.</p>)}
            </form>
            <button onClick={() => { navigate('/volunteer/register') }} >הרשמה</button>
           
        </>)
}

export default Login
