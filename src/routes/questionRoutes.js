// routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionsController');

// Create a new question
router.post('/createQuestion', questionController.createQuestion);

// Read all questions
router.get('/getAllQuestions', questionController.getAllQuestions);

// Read a specific question by ID
router.get('/getQuestionById/:id', questionController.getQuestionById);

// Update a question by ID
router.put('/updateQuestionById/:id', questionController.updateQuestionById);

// Delete a question by ID
router.delete('/deleteQuestionById/:id', questionController.deleteQuestionById);

module.exports = router;
