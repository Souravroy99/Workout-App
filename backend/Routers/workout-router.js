const express = require('express');
const router = express.Router(); 
const work = require('../Controllers/workout-controller');
const WorkoutMiddleware = require('../Middlewares/workout-middleware');

// Home route with middleware
router.get('/', WorkoutMiddleware, work.home);

// Create a new workout
router.post('/create', work.createWorkout);

// Fetch all workouts
router.get('/all', work.getAllWorkouts);

// Fetch single workout by Id
router.get('/:id', work.getWorkoutById);

// Delete single workout by Id
router.delete('/:id', work.removeWorkoutById);

// Update single workout by Id
router.patch('/:id', work.updateWorkoutById);

module.exports = router;