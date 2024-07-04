import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const removeCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

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
    const userId = location.state?.userId||getCookie("userId");
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

                const response = await fetch(`http://localhost:8082/user?userId=${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
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

            const response = await fetch(`http://localhost:8082/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userName: formData.userName,
                    address: formData.address,
                    region: formData.region,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update user data');
            }

            const data = await response.json();
            setUser(data);
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
            {isEditing ? (
                <>
                    <button type="submit">שמור</button>
                    <button type="button" onClick={() => setIsEditing(false)}>
                        ביטול
                    </button>
                </>
            ) : (
                <button type="button" onClick={() => setIsEditing(true)}>
                    עדכן
                </button>
            )}
            <button onClick={handleLogout}>התנתק</button>
        </form>
    );
}

export default PersonalProfile;
