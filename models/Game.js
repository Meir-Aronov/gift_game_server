const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({  
  players: [
    { _id: String, name: String, score: { type: Number, default: 0 } }
  ],
  currentTurn: { type: String }, // playerId
  questions: [
    {
      _id: String,
      text: String,
      answers: Boolean , // Answers of each player
    }
  ]
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
