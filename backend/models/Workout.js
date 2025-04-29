const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A workout must have a name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'A workout must have a description']
    },
    exercises: [{
        exercise: {
            type: mongoose.Schema.ObjectId,
            ref: 'Exercise',
            required: [true, 'A workout must contain exercises']
        },
        sets: {
            type: Number,
            required: [true, 'An exercise must have a number of sets']
        },
        reps: {
            type: Number,
            required: [true, 'An exercise must have a number of reps']
        },
        restTime: {
            type: Number,
            required: [true, 'An exercise must have a rest time in seconds']
        }
    }],
    duration: {
        type: Number,
        required: [true, 'A workout must have a duration in minutes']
    },
    difficulty: {
        type: String,
        required: [true, 'A workout must have a difficulty level'],
        enum: {
            values: ['beginner', 'intermediate', 'advanced'],
            message: 'Difficulty must be either beginner, intermediate, or advanced'
        }
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A workout must be created by a user']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout; 