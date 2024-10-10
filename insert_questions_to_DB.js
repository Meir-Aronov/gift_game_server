const mongoose = require('mongoose');
const Question = require('./models/Question');  
const questions = require('./questions.json');  // json file of all the questions

// connenct to mongoDB
mongoose.connect('mongodb://localhost/Love-Li')
  .then(() => {
    console.log('Connected to MongoDB');
    
    // adding the questions one by one
    Question.insertMany(questions)
      .then(() => {
        console.log('Questions added successfully');
        mongoose.disconnect();
      })
      .catch((error) => {
        console.error('Error adding questions:', error);
      });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
