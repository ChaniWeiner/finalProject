// ForgotPassword.js
import React, { useState } from 'react';

const ForgotPassword = ({ userId }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // מבצע קריאה לשרת עם האימייל של המשתמש
            const response = await fetch(`http://localhost:8082/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'charset': 'UTF-8',
                    'Authorization': token
                },
                body: JSON.stringify({ email }),
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
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
