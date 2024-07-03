import React, { useEffect, useState } from 'react';

// פונקציה לשליפת ערך מעוגיה
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const PersonalProfile = (props) => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        userName: '',
        userId: '',
        address: '',
        region: '',
        email: '',
        phoneNumber: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = getCookie('token'); // קבלת הטוקן מהעוגיה

                const response = await fetch(`http://localhost:8082/user?userId=${props.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // הוספת הטוקן ל-Headers
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

        fetchUserData();
    }, [props.userId]);

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
            const token = getCookie('token'); // קבלת הטוקן מהעוגיה

            const response = await fetch(`http://localhost:8082/user/${formData.userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // הוספת הטוקן ל-Headers
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

            // Check if the response is JSON
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setUser(data);
                setIsEditing(false); // Set to read-only mode
                alert('המשתמש עודכן בהצלחה');
            } else {
                // If it's not JSON, assume it's a success message
                const text = await response.text();
                // Check if the text includes success indication
                if (text.includes('updated successfully')) {
                    setUser(formData); // Update local user state
                    setIsEditing(false); // Set to read-only mode
                    alert('המשתמש עודכן בהצלחה');
                } else {
                    throw new Error(text);
                }
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            alert(`התרחשה שגיאה בעדכון המשתמש: ${error.message}`);
        }
    };

    return (
        <>
            {user ? (
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
                </form>
            ) : (
                <h1>טוען...</h1>
            )}
        </>
    );
}

export default PersonalProfile;
