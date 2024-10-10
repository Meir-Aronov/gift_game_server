///////////////////////////////////////////////////////////////////////////
const User = require('./models/User');
app.post('/register', async (req, res) => {
  const {couple_user_name, password, player1_id, player2_id} = req.body;
  try{
    const user = new User({couple_user_name, password, player1_id, player2_id});
    await user.save();
    res.status(201).json({message: 'User registered successfully'});
  }catch (error) {
    res.status(400).json({error: 'Registration failed', message: {error}});
  }
});

//get Question Route//////////////////////////////////////////
const Question = require('./models/Question');

// API for fetching a random question
app.get('/random-question', async (req, res) => {
  try {
    const randomQuestion = await Question.aggregate([{ $sample: { size: 1 } }]);
    res.json(randomQuestion[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching question' });
  }
});


//Game Route//////////////////////////////////////////////////
const Game = require('./models/Game');

// ניהול תשובות ותורות
app.post('/answer', async (req, res) => {
  const { gameId, playerId, isCorrect } = req.body;
  try {
    const game = await Game.findById(gameId);

    if (isCorrect) {
      game.players.find(p => p._id === playerId).score++;
    }

    // החלפת תור
    game.currentTurn = game.players.find(p => p._id !== playerId)._id;

    await game.save();
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Error updating answer' });
  }
});
