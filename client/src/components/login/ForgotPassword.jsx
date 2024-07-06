import React, { useState } from 'react';

const ForgotPassword = () => {
    const [otp, setOtp] = useState('');
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [newPas, setNewPas] = useState('');
    const [changePasw,setChangePasw]=useState(false)
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:8082/resetPassword/request-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: id }), // שליחת ID בלבד לבקשת OTP
            });

            if (!response.ok) {
                throw new Error('Failed to send OTP');
            }

            setMessage('OTP has been sent to your email.');
            setChangePasw(true)
        } catch (error) {
            setMessage('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:8082/resetPassword/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: id, otp: otp, newPassword: newPas }), // 'yourNewPassword' יש להחליף בסיסמה החדשה
            });

            if (!response.ok) {
                throw new Error('Failed to reset password');
            }

            setMessage('Password has been reset successfully.');
            setChangePasw(false)
        } catch (error) {
            setMessage('Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSendOtp}>
                <div>
                    <label htmlFor="id">User ID:</label>
                    <input
                        type="text"
                        id="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
            </form>
          {changePasw&& <form onSubmit={handleResetPassword}>
                <div>
                    <label htmlFor="otp">קוד חד פעמי:</label>
                    <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="newPas">קוד חדש:</label>
                    <input
                        type="text"
                        id="newPas"
                        value={newPas}
                        onChange={(e) => setNewPas(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Resetting Password...' : 'Reset Password'}
                </button>
            </form>}
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
