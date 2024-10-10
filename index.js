const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');

const app = express();
const JWT_SECRET = 'your_jwt_secret_key';

// Middlewares
app.use(express.json());
app.use(cors());

// connect to mongoDB
mongoose.connect('mongodb://localhost/Love-Li');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// check if server is running
app.get('/', (req, res) => {
  res.send('Server is running!');
});


// Register Route
app.post('/register', async (req, res) => {
  const { couple_user_name, password, player1_id, player2_id } = req.body;
  try {
    const user = new User({ couple_user_name, password, player1_id, player2_id});
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});


// start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
