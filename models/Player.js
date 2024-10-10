const mongoose = require('mongoose');

const playersSchema = new mongoose.Schema({  
  name: String,
  points: Number
});

const Player = mongoose.model('Player', playersSchema);
module.exports = Player;
