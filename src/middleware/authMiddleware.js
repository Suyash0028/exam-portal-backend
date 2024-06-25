// src/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token' });
    }
};
