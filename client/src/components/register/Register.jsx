import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { getCookie, setCookie } from './cookie'; // ייבוא פונקציות לטיפול בעוגיות

const Register = () => {
    const location = useLocation();
    const userType = location.state?.userType || 'profile';
    const [verifyFail, setVerifyFail] = useState(false);
    const [isExtendedDetailsOpen, setIsExtendedDetailsOpen] = useState(true);
    const [userIdentificationInformation, setUserIdentificationInformation] = useState({ userId: "", password: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const token = getCookie("token");
        if (token) {
            // פעולות לקריאה או שימוש בטוקן המצוי
            console.log("Token found:", token);
        }
        setVerifyFail(false);
    }, []);

    const { reset, register, handleSubmit, formState: { errors } } = useForm();

    const signUp = (data) => {
        fetch("http://localhost:8082/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([{
                userId: userIdentificationInformation.userId,
                userName: data.username,
                address: data.address,
                region: data.region,
                email: data.email,
                phoneNumber: data.phoneNumber
            },
            { userId: userIdentificationInformation.userId, password: userIdentificationInformation.password }
            ])
        })
            .then(response => {
                if (!response.ok) throw new Error(`status: ${response.status}`);
                return response.json();
            })
            .then((data) => {
                console.log("User registered successfully:", data.user);
                setCookie("token", data.token, 1); // שמירת הטוקן בעוגייה ל-1 שעה
                if (userType === "volunteer") {
                    navigate(`/volunteer/volunteers`, { state: { userId: userId } });
                } else if (userType === "helpRequest") {
                    navigate(`/helpRequest/requests`, { state: { userId: userId } });
                } else {
                    navigate(`/profile`, { state: { userId: userId } });
                }
                reset();
            })
            .catch((err) => {
                console.error("Registration failed:", err);
                alert("Something went wrong, please try again later");
            });
    }

    const getIn = (data) => {
        setVerifyFail(false);
        let userId = data.userId;
        let password = data.password;
        let verifyPassword = data.verifyPassword;
        if (password !== verifyPassword) {
            setVerifyFail(true);
        } else {
            fetch(`http://localhost:8082/user?userId=${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.status);
                    if (data.status === 200) {
                        alert("User already exists, please log in");
                    } else {
                        setIsExtendedDetailsOpen(!isExtendedDetailsOpen);
                        setUserIdentificationInformation({ userId: userId, password: password });
                        navigate('details');
                    }
                    reset();
                })
                .catch((err) => {
                    console.error("Error fetching user data:", err);
                    alert("Something went wrong, please try again later");
                });
        }
    }

    const getInForm = () => {
        return (
            <div>
                <form onSubmit={handleSubmit(getIn)}>
                    <input type='text' placeholder='userId' {...register("userId", { required: true })} />
                    {errors.userId && errors.userId.type === "required" && (<p className="errorMsg">User ID is required.</p>)}
                    <input type='password' placeholder='password'  {...register("password", { required: true })} />
                    {errors.password && errors.password.type === "required" && (<p className="errorMsg">Password is required.</p>)}
                    <input type='password' placeholder='verify-password'  {...register("verifyPassword", { required: true })} />
                    {errors.verifyPassword && errors.verifyPassword.type === "required" && (<p className="errorMsg">Verification password is required.</p>)}
                    {verifyFail && <p className="errorMsg">Verification failed, please try again.</p>}
                    <input type="submit" value="Sign Up" />
                </form>
                <button onClick={() => navigate('/login', { state: { userType: "volunteer" } })}>כניסה</button>
            </div>
        );
    }

    const detailesForm = () => {
        return (
            <form onSubmit={handleSubmit(signUp)}>
                <h3>Just a few more details and you're in!</h3>
                <input type='text' placeholder='username'  {...register("username", { required: true })} />
                {errors.username && errors.username.type === "required" && (<p className="errorMsg">Username is required.</p>)}
                <br />
                <input type='text' placeholder='address'  {...register("address", { required: true })} />
                {errors.address && errors.address.type === "required" && (<p className="errorMsg">Address is required.</p>)}
                <br />
                <select {...register("region", { required: true })}>
                    <option value="">בחר אזור</option>
                    <option value="צפון">צפון</option>
                    <option value="דרום">דרום</option>
                    <option value="מרכז">מרכז</option>
                    <option value="ירושלים">ירושלים</option>
                    <option value="חיפה">חיפה</option>
                    <option value="תל אביב">תל אביב</option>
                </select>

                {errors.region && errors.region.type === "required" && (<p className="">Region is required.</p>)}
                <br />
                <input type='email' placeholder='email'  {...register("email", { required: true })} />
                {errors.email && errors.email.type === "required" && (<p className="errorMsg">Email is required.</p>)}
                <br />
                <input type='tel' placeholder='phoneNumber'  {...register("phoneNumber", { required: true })} />
                {errors.phoneNumber && errors.phoneNumber.type === "required" && (<p className="errorMsg">Phone number is required.</p>)}
                <input type="submit" value="Register" />
            </form>
        );
    }

    return (
        <>
            <h3>Register</h3>
            {isExtendedDetailsOpen ? getInForm() : detailesForm()}
        </>
    );
}

export default Register;
