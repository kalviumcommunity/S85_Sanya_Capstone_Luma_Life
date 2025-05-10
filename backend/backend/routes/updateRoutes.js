const express = require('express');
const router = express.Router();

// Import update routes
const userUpdates = require('./updates/userUpdates');
const workoutUpdates = require('./updates/workoutUpdates');
const savedWorkouts = require('./updates/savedWorkouts');

// Use routes
router.use('/user', userUpdates);
router.use('/workout', workoutUpdates);
router.use('/save-workout', savedWorkouts);

module.exports = router; 