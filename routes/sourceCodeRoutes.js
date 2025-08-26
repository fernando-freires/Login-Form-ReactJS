const express = require('express');
const router = express.Router();
const sourceCodeController = require('../controllers/sourceCodeController');

// Route to handle source code submission
router.post('/', (req, res, next) => {
    sourceCodeController.handleSubmission(req, res, next);
});

module.exports = router;
