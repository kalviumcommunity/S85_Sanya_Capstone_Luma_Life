const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');
// Get all exercises
router.get('/', async (req, res) => {
    try {
        const exercises = await Exercise.find().populate('createdBy', 'name');
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get exercise by ID
router.get('/:id', async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id).populate('createdBy', 'name');
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.json(exercise);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new exercise
router.post('/', async (req, res) => {
    const exercise = new Exercise({
        ...req.body,
        createdBy: req.user._id
    });

    try {
        const newExercise = await exercise.save();
        res.status(201).json(newExercise);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update exercise
router.patch('/:id',async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        // Check if user is the creator or admin
        if (exercise.createdBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to update this exercise' });
        }

        Object.assign(exercise, req.body);
        const updatedExercise = await exercise.save();
        res.json(updatedExercise);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete exercise
router.delete('/:id', async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        // Check if user is the creator or admin
        if (exercise.createdBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to delete this exercise' });
        }

        await exercise.remove();
        res.json({ message: 'Exercise deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 