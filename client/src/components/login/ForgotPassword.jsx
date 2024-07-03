import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const token = getCookie('token'); // קבלת הטוקן מהעוגיה

            // מבצע קריאה לשרת עם האימייל של המשתמש
            const response = await fetch(`http://localhost:8082/password/${id}&${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'charset': 'UTF-8',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id,email }),
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            // מצליח, מציג הודעה למשתמש
            setMessage('An email has been sent with instructions to reset your password.');
        } catch (error) {
            // טופל שגיאות
            setMessage('Failed to send reset instructions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="id">id:</label>
                    <input
                        type="id"
                        id="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
