const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'An exercise must have a name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'An exercise must have a description']
    },
    muscleGroup: {
        type: String,
        required: [true, 'An exercise must target a muscle group'],
        enum: {
            values: ['chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'full body'],
            message: 'Muscle group must be one of: chest, back, legs, shoulders, arms, core, full body'
        }
    },
    equipment: {
        type: String,
        required: [true, 'An exercise must specify required equipment'],
        enum: {
            values: ['bodyweight', 'dumbbells', 'barbell', 'kettlebell', 'resistance bands', 'machine', 'other'],
            message: 'Equipment must be one of: bodyweight, dumbbells, barbell, kettlebell, resistance bands, machine, other'
        }
    },
    difficulty: {
        type: String,
        required: [true, 'An exercise must have a difficulty level'],
        enum: {
            values: ['beginner', 'intermediate', 'advanced'],
            message: 'Difficulty must be either beginner, intermediate, or advanced'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    videoUrl: String,
    imageUrl: String,
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'An exercise must be created by a user']
    },
    
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise; 