import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiEdit2Fill } from "react-icons/ri";

import { BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import './personalProfile.css';
import { getUserData, updateUser,getCookie,removeCookie } from '../httpController'; // יבוא של הפונקציות המעדכנות ומבצעות בקשות


const PersonalProfile = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        userName: '',
        userId: '',
        address: '',
        region: '',
        email: '',
        phoneNumber: ''
    });
    const location = useLocation();
    const userId = location.state?.userId || getCookie("userId");
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = getCookie('token');
                if (!token) {
                    navigate('/login');  // Navigate to login if token is missing
                    return;
                }

                const data = await getUserData(userId); // קריאה לפונקצית getUserData מה-HTTP Controller

                setUser(data[0]);
                setFormData(data[0]);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = getCookie('token');
            const updatedUser = {
                userName: formData.userName,
                address: formData.address,
                region: formData.region,
                email: formData.email,
                phoneNumber: formData.phoneNumber
            };

            await updateUser(userId, updatedUser); // קריאה לפונקצית updateUser מה-HTTP Controller

            setIsEditing(false);
            alert('המשתמש עודכן בהצלחה');
        } catch (error) {
            console.error('Error updating user data:', error);
            alert(`התרחשה שגיאה בעדכון המשתמש: ${error.message}`);
        }
    };

    const handleLogout = () => {
        removeCookie('token');
        removeCookie('userId');
        navigate('/login');
    };

    if (!userId) {
        return <h1>טוען...</h1>;
    }

    return (
        <div className="personal-profile">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>שם משתמש:</label>
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div>
                    <label>מזהה משתמש:</label>
                    <input
                        type="text"
                        name="userId"
                        value={formData.userId}
                        readOnly
                    />
                </div>
                <div>
                    <label>כתובת:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div>
                    <label>אזור:</label>
                    <input
                        type="text"
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div>
                    <label>דוא"ל:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div>
                    <label>מספר טלפון:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div className="button-container">
                    {isEditing ? (
                        <>
                            <button type="submit"><BiSave /> שמור</button>
                            <button type="button" onClick={() => setIsEditing(false)}><MdCancel /> ביטול</button>
                        </>
                    ) : (
                        <button type="button" onClick={() => setIsEditing(true)}><RiEdit2Fill /> עריכה</button>
                    )}
                    {/* <button type="button" onClick={handleLogout}><FaSignOutAlt /> יציאה</button> */}
                </div>
            </form>
        </div>
    );
}

export default PersonalProfile;
