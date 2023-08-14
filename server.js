// server.js
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const PORT = 4000; // You can choose any available port number

// Middleware
app.use(express.json());
app.use(cors()); 


// server.js
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://navdeepcaur:NavMongoDb@cluster0.rycfmq6.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));


const usersRouter = require('./routes/user');
app.use('/user', usersRouter);

const moodRouter = require('./routes/mood');
app.use('/mood', moodRouter);

const journalRouter = require('./routes/journal');
app.use('/journalentry', journalRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});













