// src/routes/userRoutes.js

const express = require('express');
const { getUsers, approveUser, rejectUser } = require('../controllers/userController');

const router = express.Router();

router.get('/approve/:userId', approveUser);
router.get('/reject/:userId', rejectUser);
router.get('/getUsers', getUsers);

module.exports = router;
