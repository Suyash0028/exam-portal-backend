// src/controllers/userController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Function to generate a token for approval/rejection
const generateActionToken = (userId, action) => {
    return jwt.sign({ userId, action }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.approveUser = async (req, res) => {
    const { userId } = req.params;
    if (userId) {
        try {
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            user.isApproved = true;
            await user.save();

            res.status(200).json({ message: 'User approved successfully' });
        } catch (error) {
            console.error('Approval error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

};

exports.rejectUser = async (req, res) => {
    const { userId } = req.params;

    if (userId) {
        try {
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.isApproved = false;
            await user.save();

            res.status(200).json({ message: 'User rejected successfully' });
        } catch (error) {
            console.error('Rejection error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({ isAdmin: false });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
};