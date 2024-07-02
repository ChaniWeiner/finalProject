import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export const createToken = (user) => {
    return jwt.sign({ userId: user.userId, username: user.userName }, secretKey, { expiresIn: '1h' });
}

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token.' });
        }

        req.userId = decoded.userId; // שינוי ל-decoded.userId במקום decoded.id
        next();
    });
}
