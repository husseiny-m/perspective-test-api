const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController')
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(questionController.getQuestions))

module.exports = router;
