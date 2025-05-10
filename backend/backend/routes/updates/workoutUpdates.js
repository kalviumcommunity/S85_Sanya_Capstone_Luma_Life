const express = require('express');
const router = express.Router();
const Workout = require('../../models/Workout');

// Update workout
router.put('/:id', async (req, res) => {
    try {
        const workoutId = req.params.id;
        const {
            title,
            description,
            exercises,
            difficulty,
            duration,
            category
        } = req.body;

        // Find workout first
        const workout = await Workout.findById(workoutId);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        // Validate exercises if provided
        if (exercises) {
            if (!Array.isArray(exercises) || exercises.length === 0) {
                return res.status(400).json({ message: 'At least one exercise is required' });
            }
        }

        // Update workout object
        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (exercises) updateData.exercises = exercises;
        if (difficulty) updateData.difficulty = difficulty;
        if (duration) updateData.duration = duration;
        if (category) updateData.category = category;

        // Update workout
        const updatedWorkout = await Workout.findByIdAndUpdate(
            workoutId,
            { $set: updateData },
            { new: true }
        ).populate('creator', 'name email');

        res.json(updatedWorkout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 