const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    savedWorkouts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout'
    }],
});

module.exports = mongoose.model('User', userSchema); 