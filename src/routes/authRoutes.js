// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);


// Protected route
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId });
});

module.exports = router;
