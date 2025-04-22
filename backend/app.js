const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to workout api" });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app; 