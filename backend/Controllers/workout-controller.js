const WorkoutModel = require('../Models/workout-model')
const mongoose = require('mongoose')


const home = async(req, res) => {
    try{
        res.status(200).json({msg: 'Welcome to the app'})
    }
    catch(error){
        console.log(`Auth-Controller HOME ERROR: ${error}`)
        res.status(400).json({error: error.message}) 
        // next(error)
    }
}


// 1 Create/Add a new workout
const createWorkout = async(req,res) => {
    try{
        const {title, reps, load} = req.body 
        const workout = await WorkoutModel.create({title, reps, load})

        res.status(200).json(workout) 
    }
    catch(error){
        console.log(`Auth-Controller CREATEDWORKOUT ERROR: ${error}`)
        res.status(400).json({error: error.message}) 
        // next(error)
    }
}


// 2 Fetch all the workouts
const getAllWorkouts = async(req,res) => {
    try{
        const allWorkouts = await WorkoutModel.find().sort({createdAt: -1}) 

        res.status(200).json(allWorkouts) 
    }
    catch(error){
        console.log(`Auth-Controller GETALLWORKOUTS ERROR: ${error}`)
        res.status(400).json({error: error.message})
        // next(error)
    }
} 


// 3 Fetch Workout By ID
const getWorkoutById = async(req,res) => {
    try{
        const {id} = req.params 

        // If the 'id' is invalid then for protection of mongodb, we need to verify that is the 'id' is mongodb type
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No such workout!"})
        }

        const singleWorkoutById = await WorkoutModel.find({_id:id}) 

        if(!singleWorkoutById) {
            return res.status(404).json({error: "No such workout"})
        }

        res.status(200).json(singleWorkoutById)
    }
    catch(error){
        console.log(`Auth-Controller GETWORKOUTBYID ERROR: ${error}`)
        res.status(400).json({error: error.message})
        // next(error)
    }
}


// 4 Delete workout by ID
const removeWorkoutById = async(req,res) => {
    try{
        const id = req.params.id 
        
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No such workout!"})
        }

        const removedWorkout = await WorkoutModel.findOneAndDelete({_id:id}) 
        res.status(200).json(removedWorkout)
    }
    catch(error){
        console.log(`Auth-Controller REMOVEWORKOUTBYID ERROR: ${error}`)
        res.status(400).json({error: error.message})
        // next(error)
    }
}


// 5 Update Workout by Id
const updateWorkoutById = async(req,res) => {
    try{
        const id = req.params.id 
        
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No such workout!"})
        }

        const updateDetails = req.body

        const updatedWorkout = await WorkoutModel.findOneAndUpdate({_id:id}, {$set: updateDetails})

        res.status(200).json(updatedWorkout)
    }
    catch(error){
        console.log(`Auth-Controller UPDATEWORKOUTBYID ERROR: ${error}`)
        res.status(400).json({error: error.message})  
        // next(error)
    }
}

module.exports ={ 
                    home, 
                    createWorkout,
                    getAllWorkouts,
                    getWorkoutById,
                    removeWorkoutById,
                    updateWorkoutById
                }