const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        default: 0
    },
    notes: String
});

const workoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    exercises: [exerciseSchema],
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Workout', workoutSchema); 