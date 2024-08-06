

// In your app.js
require('dotenv').config(); // Load environment variables from .env

const express = require('express'); 
const app = express();
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI; // Access the variable

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// ... rest of your code


const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');




app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: './uploads/' }).single('file'));

const papersRouter = require('./routes/papers');
const reviewersRouter = require('./routes/reviewers');
const registrationsRouter = require('./routes/registrations');


app.use('/api/papers', papersRouter);
app.use('/api/reviewers', reviewersRouter);
app.use('/api/registrations', registrationsRouter);

app.listen(8081, () => {
  console.log('Server listening on port 8081');
});