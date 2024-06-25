// controllers/questionController.js
const Question = require('../models/Questions');

// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).send(question);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).send(questions);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Read a specific question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).send();
    }
    res.status(200).send(question);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a question by ID
exports.updateQuestionById = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!question) {
      return res.status(404).send();
    }
    res.status(200).send(question);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a question by ID
exports.deleteQuestionById = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).send();
    }
    res.status(200).send(question);
  } catch (error) {
    res.status(500).send(error);
  }
};
