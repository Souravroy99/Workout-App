require('dotenv').config()

const express = require('express')
const app = express()
const workRouter = require('./Routers/workout-router')
const userRouter = require('./Routers/users-router')
const Database = require('./Utils/Database')
const cors = require('cors')

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};
app.use(cors(corsOptions)) ;

// Middleware to parse JSON bodies
app.use(express.json())

app.use('/api/workouts', workRouter)
app.use('/api/user', userRouter) ;
   

const Port = 5000
Database()
.then(()=>{
    app.listen(Port, () => {
        console.log("Listening on port: ", Port)
    })
})