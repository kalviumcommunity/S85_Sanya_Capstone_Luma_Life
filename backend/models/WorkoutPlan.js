const mongoose = require('mongoose');

const workoutPlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A workout plan must have a name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'A workout plan must have a description']
    },
    duration: {
        type: Number,
        required: [true, 'A workout plan must have a duration in weeks']
    },
    difficulty: {
        type: String,
        required: [true, 'A workout plan must have a difficulty level'],
        enum: {
            values: ['beginner', 'intermediate', 'advanced'],
            message: 'Difficulty must be either beginner, intermediate, or advanced'
        }
    },
    workouts: [{
        workout: {
            type: mongoose.Schema.ObjectId,
            ref: 'Workout',
            required: [true, 'A workout plan must contain workouts']
        },
        dayOfWeek: {
            type: Number,
            required: [true, 'A workout must be assigned to a day of the week'],
            min: 0,
            max: 6
        }
    }],
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A workout plan must be created by a user']
    },
    assignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

module.exports = WorkoutPlan; 