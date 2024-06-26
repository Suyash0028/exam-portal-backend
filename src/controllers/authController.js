// src/controllers/authController.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const axios = require('axios');

// Helper function to generate action token
const generateActionToken = (userId, action) => {
    return jwt.sign({ userId, action }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.signup = async (req, res) => {
    try {
        const { fullName, email, contactNumber, password, examDate, isApproved } = req.body;

        // Check if the email is already registered
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        user = new User({
            fullName,
            email,
            contactNumber,
            password: hashedPassword,
            examDate,
            isApproved
        });
        //console.log('Email');
        // Save the user to the database
        await user.save();
        // Generate tokens for approval and rejection
        // const approveToken = user._id;
        // const rejectToken = user._id;
        // console.log('Email');
        // // Send email to admin
        // const mailOptions = {
        //     from: {
        //         email: "examportalrp@gmail.com",
        //         name: "Exam Portal"
        //     },
        //     to: [
        //         {
        //             email: "suyashkulkarni43@gmail.com",
        //             name: "Suyash Kulkarni"
        //         }
        //     ],
        //     subject: "New User Signup",
        //     html: `
        //         <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        //             <h2 style="color: #0056b3;">New User Signup</h2>
        //             <p style="font-size: 16px;">A new user has signed up:</p>
        //             <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
        //                 <tr>
        //                     <td style="padding: 8px; border: 1px solid #ddd;">Name:</td>
        //                     <td style="padding: 8px; border: 1px solid #ddd;">${fullName}</td>
        //                 </tr>
        //                 <tr>
        //                     <td style="padding: 8px; border: 1px solid #ddd;">Email:</td>
        //                     <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
        //                 </tr>
        //                 <tr>
        //                     <td style="padding: 8px; border: 1px solid #ddd;">Contact Number:</td>
        //                     <td style="padding: 8px; border: 1px solid #ddd;">${contactNumber}</td>
        //                 </tr>
        //                 <tr>
        //                     <td style="padding: 8px; border: 1px solid #ddd;">Exam Date:</td>
        //                     <td style="padding: 8px; border: 1px solid #ddd;">${examDate}</td>
        //                 </tr>
        //             </table>
        //             <p style="font-size: 16px;">Please review the signup details and take the necessary action:</p>
        //             <div style="margin: 20px 0;">
        //                 <a href="http://localhost:3000/api/users/approve/${approveToken}" 
        //                    style="text-decoration: none; color: #fff; background-color: #28a745; padding: 10px 15px; border-radius: 5px; margin-right: 10px;">
        //                    Approve
        //                 </a>
        //                 <a href="http://localhost:3000/api/users/reject/${rejectToken}" 
        //                    style="text-decoration: none; color: #fff; background-color: #dc3545; padding: 10px 15px; border-radius: 5px;">
        //                    Reject
        //                 </a>
        //             </div>
        //         </div>
        //     `,
        // };
        
        // const apiToken = 'b401e42c57441f3cdcbe4b10b05f2159';
        // // Make a POST request to the Mailtrap API endpoint
        // axios.post('https://send.api.mailtrap.io/api/send', mailOptions, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Api-Token': apiToken, // Make sure the API token is correct
        //     },
        // })
        // .then(response => {
        //     console.log('Email sent successfully:', response.data);
        // })
        // .catch(error => {
        //     if (error.response) {
        //         console.error('Error sending email:', error.response.data);
        //     } else {
        //         console.error('Error sending email:', error.message);
        //     }
        // });



        res.status(201).json({ message: 'Now wait for admin\'s approval!!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found. Please try again!' });
        }
        else if (user.examDate < Date.now() && !user.isAdmin) {
            return res.status(401).json({ message: 'You can\'t login now.' });
        }
        else if (!user.isApproved && !user.isAdmin) {
            return res.status(401).json({ message: 'You are not allowed to login.' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Check if the user is an admin
        const isAdmin = user.isAdmin;
        const userId = user._id;
        res.status(200).json({ token, isAdmin, userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
