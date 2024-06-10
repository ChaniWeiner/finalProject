import React, { useEffect, useState, useContext } from 'react';
//import { currentUserContext } from '../Main'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
const Register = () => {
    const location = useLocation();
    const userType = location.state.userType;
    //const [user, setUser] = useContext(currentUserContext);
    const [verifyFail, setVerifyFail] = useState(false)
    const [isExtendedDetailsOpen, setIsExtendedDetailsOpen] = useState(true);
    const [userIdentificationInformation, setUserIdentificationInformation] = useState({ userId: "", password: "" });
    const navigate = useNavigate();
    useEffect(() => { setVerifyFail(false) }, [])
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const signUp = (data) => {
        fetch("http://localhost:8082/volunteer/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'charset': 'UTF-8' },

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
            .then(response => { if (!response.ok) throw new Error(`status: ${response.status}`); return response.json() })
            .then((data) => {
                alert("added ");
                // setUser(data["user"])
                //  localStorage.setItem("user", (JSON.stringify({ userId: data["user"].userId, username: data["user"].username })));
                navigate('volunteers')

                reset()
            })
            .catch((err) => { console.error(err); alert("something went wrong please try later") })

    }

    const getIn = (data) => {
        setVerifyFail(false)
        let userId = data.userId;
        let password = data.password;
        let verifyPassword = data.verifyPassword;
        if (password != verifyPassword)
            setVerifyFail(true);
        else {
            fetch(`http://localhost:8082/user?userId=${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.status)
                    if (data.status == 200) {
                        alert("User already exists, please log in");
                    }
                    else {
                        setIsExtendedDetailsOpen((isExtendedDetailsOpen) => !isExtendedDetailsOpen);
                        setUserIdentificationInformation({ userId: userId, password: password });
                        navigate('details');
                    }
                    reset()
                })
        }
    }

    const getInForm = () => {
        return <div>
            <form onSubmit={handleSubmit(getIn)} >
                <input type='text' placeholder='userId' {...register("userId", { required: true })} />
                {errors.userId && errors.userId.type === "required" && (<p className="errorMsg">userId is required.</p>)}
                <input type='password' placeholder='password'  {...register("password", { required: true })} />
                {errors.password && errors.password.type === "required" && (<p className="errorMsg">Password is required.</p>)}
                <input type='password' placeholder='verify-password'  {...register("verifyPassword", { required: true })} />
                {errors.verifyPassword && errors.verifyPassword.type === "required" && (<p className="errorMsg">Verify-password is required.</p>)}
                {verifyFail && <p className="errorMsg">Verification failed please try again.</p>}
                <input type="submit" value="sign up" />
            </form>
            <button onClick={() => { navigate('/volunteer/login') }} >sign in</button>
        </div>
    }

    const detailesForm = () => {

        return <form onSubmit={handleSubmit(signUp)}>
            <h3>Just a few more details and you're in!</h3>
            <input type='text' placeholder='username'  {...register("username", { required: true })} />
            {errors.username && errors.username.type === "required" && (<p className="errorMsg">username is required.</p>)}
            <br />
            <input type='text' placeholder='address'  {...register("address", { required: true })} />
            {errors.address && errors.address.type === "required" && (<p className="errorMsg">address is required.</p>)}
            <br />
            <select {...register("region", { required: true })}>
                <option value="">בחר אזור</option>
                <option value="north">צפון</option>
                <option value="south">דרום</option>
                <option value="central">מרכז</option>
                <option value="jerusalem">ירושלים</option>
                <option value="haifa">חיפה</option>
                <option value="tel-aviv">תל אביב</option>
            </select>
            {errors.region && errors.region.type === "required" && (<p className="">אזור הוא שדה חובה.</p>)}
            <br />
            <input type='email' placeholder='email'  {...register("email", { required: true })} />
            {errors.email && errors.email.type === "required" && (<p className="errorMsg">email is required.</p>)}
            <br />
            <input type='tel' placeholder='phoneNumber'  {...register("phoneNumber", { required: true })} />
            {errors.phoneNumber && errors.phoneNumber.type === "required" && (<p className="errorMsg">phoneNumber is required.</p>)}
            {/* <br />
            <input type='email' placeholder='email' {...register("email", {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
            })} />
            {errors.email && errors.email.type === "required" && (<p className="errorMsg">Email is required.</p>)}
            {errors.email && errors.email.type === "pattern" && (<p className="errorMsg">Email is not valid.</p>)} */}
            {/* <br />
            <input type='tel' placeholder='phone' {...register("phone", { required: true, pattern: /^[0-9]+$/, minLength: 9, maxLength: 10 })} />
            {errors.phone && errors.phone.type === "required" && (<p className="errorMsg">Phone is required.</p>)}
            {errors.phone && errors.phone.type === "pattern" && (<p className="errorMsg">Phone should include only numbers.</p>)}
            {errors.phone && errors.phone.type === "minLength" && (<p className="errorMsg">Phone should be at-least 9 characters.</p>)}
            {errors.phone && errors.phone.type === "maxLength" && (<p className="errorMsg">Phone should be not-more 9 characters.</p>)}
            <br /> */}
            <input type="submit" value="register" />
        </form>

    }

    return (
        <>
            <h3>Register</h3>
            {isExtendedDetailsOpen && getInForm()}
            {!isExtendedDetailsOpen && detailesForm()}

        </>)
}

export default Register