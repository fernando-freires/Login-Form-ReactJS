const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const sourceCodeRoutes = require('./routes/sourceCodeRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer to use memory storage
const upload = multer({
  storage: multer.memoryStorage()
});

// Define route with multer middleware to handle file upload with field name 'OriginalCodeFile'
app.use('/source-code', upload.single('OriginalCodeFile'), sourceCodeRoutes);

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
