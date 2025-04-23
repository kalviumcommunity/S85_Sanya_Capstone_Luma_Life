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

// Create new workout
router.post('/', async (req, res) => {
    try {
        const { 
            title, 
            description, 
            exercises, 
            difficulty,
            duration,
            category,
            creator 
        } = req.body;

        // Validate required fields
        if (!title || !description || !exercises || !difficulty || !duration || !category || !creator) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate exercises array
        if (!Array.isArray(exercises) || exercises.length === 0) {
            return res.status(400).json({ message: 'At least one exercise is required' });
        }

        // Create new workout
        const workout = new Workout({
            title,
            description,
            exercises,
            difficulty,
            duration,
            category,
            creator
        });

        const savedWorkout = await workout.save();
        
        // Populate creator details in response
        await savedWorkout.populate('creator', 'name email');
        
        res.status(201).json(savedWorkout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 