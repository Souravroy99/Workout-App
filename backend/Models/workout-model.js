const mongoose = require('mongoose')

const WorkoutSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    reps:{
        type: Number,
        required: true,
    },
    load:{
        type: Number,
        required: true,
    },
}, { timestamps: true })   // timestamps, indicates that the 'time' when the model/document has been created

const WorkoutModel = mongoose.model('workouts', WorkoutSchema);

module.exports = WorkoutModel