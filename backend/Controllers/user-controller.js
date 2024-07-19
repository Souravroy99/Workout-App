const WorkoutModel = require('../Models/workout-model')
const User = require('../Models/user-model')

// install --> npm i validator and then delete this comment
const validator = require('validator')


// For SignUp
const signupUser = async(req,res) => {
    try{
        const {email, password} = req.body

        // Validation
        if(!email || !password) {
            throw Error("All fields must be filled")
        }

        if(!validator.isEmail(email)) {
            throw Error('Email is not valid')
        }
        if(!validator.isStrongPassword(passowrd)) {
            throw Error("Password is not strong enough")
        }
        

        const userExists = await User.findOne({email: email}) ;

        if(userExists) {
            return res.status(400).json({message: "Email already in use"})
        }

        const createdUser = await User.create({email,password})

        return res.status(200).json({   message: createdUser, 
                                        token: await createdUser.generateToken(), 
                                        userId: createdUser._id.toString()
                                   })
    }
    catch(error){
        res.status(404).json({error: error.message})
    }
}


// For Login
const loginUser = async(req,res) => {
    try{
        const {email, password} = req.body ;

        if(!email || !password) {
            throw Error("All fields must be filled")
        }

        const userExists = await User.findOne({email: email}) ;

        if(!userExists) {
            res.status(401).json({message: 'Invalid Login  Credentials!'})
        }

        const isValidPassword = await userExists.comparePassword(password)

        if(isValidPassword) {
            return res.status(201).json({   message: "User Successfully LoggedIn",
                                            token: await userExists.generateToken(),
                                            userId: userExists._id.toString()
            })
        }
        else {
            res.status(401).json({error: 'Invalid Login Credentials!'})
        }
    }
    catch(error){
        res.status(404).json({error: error.message})
    }
}



module.exports = {loginUser, signupUser}