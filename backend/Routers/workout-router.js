const express = require('express')
const router = express.Router() 
const work = require('../Controllers/workout-controller') ;
const WorkoutMiddleware = require('../Middlewares/workout-middleware')


// Get data from home page
router.route('/').get(WorkoutMiddleware, work.home) ;


// Create a new workout
router.route('/').post(work.createWorkout) ; 


// Fetch all workouts
router.route('/a').get(work.getAllWorkouts) ; 


// Fetch single workout by Id
router.route('/:id').get(work.getWorkoutById) ;


// Delete single workout by Id
router.route('/delete/:id').delete(work.removeWorkoutById)


// Update single workout by Id
router.route('/update/:id').patch(work.updateWorkoutById)


module.exports = router