const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// Get all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find()
            .populate('creator', 'name email');
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get workout by ID
router.get('/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id)
            .populate('creator', 'name email');
            
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.json(workout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get workouts by difficulty level
router.get('/difficulty/:level', async (req, res) => {
    try {
        const workouts = await Workout.find({ 
            difficulty: req.params.level 
        }).populate('creator', 'name email');
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 