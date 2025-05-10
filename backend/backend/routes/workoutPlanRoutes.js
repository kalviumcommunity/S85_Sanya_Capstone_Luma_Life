const express = require('express');
const router = express.Router();
const WorkoutPlan = require('../models/WorkoutPlan');
// Get all workout plans
router.get('/', async (req, res) => {
    try {
        const workoutPlans = await WorkoutPlan.find()
            .populate('createdBy', 'name')
            .populate('assignedTo', 'name')
            .populate('workouts.workout');
        res.json(workoutPlans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get workout plan by ID
router.get('/:id', async (req, res) => {
    try {
        const workoutPlan = await WorkoutPlan.findById(req.params.id)
            .populate('createdBy', 'name')
            .populate('assignedTo', 'name')
            .populate('workouts.workout');
        if (!workoutPlan) {
            return res.status(404).json({ message: 'Workout plan not found' });
        }
        res.json(workoutPlan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new workout plan
router.post('/', async (req, res) => {
    const workoutPlan = new WorkoutPlan({
        ...req.body,
        createdBy: req.user._id
    });

    try {
        const newWorkoutPlan = await workoutPlan.save();
        res.status(201).json(newWorkoutPlan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update workout plan
router.patch('/:id', async (req, res) => {
    try {
        const workoutPlan = await WorkoutPlan.findById(req.params.id);
        if (!workoutPlan) {
            return res.status(404).json({ message: 'Workout plan not found' });
        }

        // Check if user is the creator or admin
        if (workoutPlan.createdBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to update this workout plan' });
        }

        Object.assign(workoutPlan, req.body);
        const updatedWorkoutPlan = await workoutPlan.save();
        res.json(updatedWorkoutPlan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete workout plan
router.delete('/:id', async (req, res) => {
    try {
        const workoutPlan = await WorkoutPlan.findById(req.params.id);
        if (!workoutPlan) {
            return res.status(404).json({ message: 'Workout plan not found' });
        }

        // Check if user is the creator or admin
        if (workoutPlan.createdBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to delete this workout plan' });
        }

        await workoutPlan.remove();
        res.json({ message: 'Workout plan deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Assign workout plan to user
router.post('/:id/assign', async (req, res) => {
    try {
        const workoutPlan = await WorkoutPlan.findById(req.params.id);
        if (!workoutPlan) {
            return res.status(404).json({ message: 'Workout plan not found' });
        }

        // Check if user is the creator or admin
        if (workoutPlan.createdBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to assign this workout plan' });
        }

        workoutPlan.assignedTo = req.body.userId;
        const updatedWorkoutPlan = await workoutPlan.save();
        res.json(updatedWorkoutPlan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router; 