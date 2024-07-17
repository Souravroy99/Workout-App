require('dotenv').config()

const express = require('express')
const app = express()
const workRouter = require('./Routers/workout-router')
const Database = require('./Utils/Database')

// Middleware to parse JSON bodies
app.use(express.json())

app.use('/api/workouts', workRouter)
   

const Port = process.env.PORT
Database()
.then(()=>{
    app.listen(Port, () => {
        console.log("Listening on port: ", Port)
    })
})