import React, { useEffect, useState } from 'react';

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
        fetch(`http://localhost:8082/user?userId=${props.userId}`)
            .then((response) => response.json())
            .then(data => {
                setUser(data[0]);
                setFormData(data[0]);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, [props.userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8082/user/${formData.userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: formData.userName,
                address: formData.address,
                region: formData.region,
                email: formData.email,
                phoneNumber: formData.phoneNumber
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            setUser(data);
            setIsEditing(false); // Set to read-only mode
            alert('המשתמש עודכן בהצלחה');
        })
        .catch(error => {
            console.error('Error updating user data:', error);
            alert('התרחשה שגיאה בעדכון המשתמש');
        });
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
