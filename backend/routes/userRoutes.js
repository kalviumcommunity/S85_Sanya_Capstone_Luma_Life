const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
            .select('-password')
            .populate('savedWorkouts');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password')
            .populate('savedWorkouts');
            
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await user.save();
        
        // Remove password from response
        const userResponse = savedUser.toObject();
        delete userResponse.password;
        
        res.status(201).json(userResponse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 