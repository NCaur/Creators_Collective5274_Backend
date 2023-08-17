const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

// Routes - Authentication Endpoints
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, age, gender  } = req.body;

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Use bcrypt to hash the password
    const saltRounds = 10; // You can adjust the salt rounds as needed for security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save the user data to MongoDB
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      age,
      gender,


    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists in the database
    const user = await User.findOne({ username });

    // If the username is not found in the database, return an error response
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If the passwords do not match, return an error response
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Passwords match, login successful
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});


module.exports = router;