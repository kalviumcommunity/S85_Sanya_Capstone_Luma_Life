const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Workout = require("../../models/Workout");

// Add workout to user's saved workouts
router.put("/:userId/:workoutId", async (req, res) => {
  try {
    const { userId, workoutId } = req.params;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if workout exists
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    // Check if workout is already saved
    if (user.savedWorkouts.includes(workoutId)) {
      return res.status(400).json({ message: "Workout already saved" });
    }

    // Add workout to saved workouts
    user.savedWorkouts.push(workoutId);
    await user.save();

    // Get updated user with populated workouts
    const updatedUser = await User.findById(userId)
      .select("-password")
      .populate("savedWorkouts");

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
