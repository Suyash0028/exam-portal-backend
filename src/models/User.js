// src/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    examDate: {
        type: Date, // Exam date field
        required: true
    },
    isApproved: { 
        type: Boolean, 
        default: false,
        required: true 
    },
    isAdmin: { 
        type: Boolean, 
        default: false,
        required: true 
    }
});

module.exports = mongoose.model('User', userSchema);
