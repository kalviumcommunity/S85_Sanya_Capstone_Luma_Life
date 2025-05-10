const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
// Get all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find().populate('createdBy', 'name').populate('exercises.exercise');
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get workout by ID
router.get('/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id)
            .populate('createdBy', 'name')
            .populate('exercises.exercise');
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.json(workout);
    } catch (err) {
        res.status(500).json({ message: err.message });
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
    const workout = new Workout({
        ...req.body,
        createdBy: req.user._id
    });

    try {
        const newWorkout = await workout.save();
        res.status(201).json(newWorkout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update workout
router.patch('/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        // Check if user is the creator or admin
        if (workout.createdBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to update this workout' });
        }

        Object.assign(workout, req.body);
        const updatedWorkout = await workout.save();
        res.json(updatedWorkout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete workout
router.delete('/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        // Check if user is the creator or admin
        if (workout.createdBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to delete this workout' });
        }

        await workout.remove();
        res.json({ message: 'Workout deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 