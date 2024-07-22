const mongoose = require('mongoose')
const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken') 

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
})


// Secure the password with 'bcrypt'
UserSchema.pre('save', async function(req, res, next){
    if(!this.isModified(password)){
        next()
    }

    try{
        const salt = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(this.password, salt)
        this.password = hash_password
    }
    catch(error){
        console.log(`Error in user-model.js 'pre'-function`)
        alert(`Error in user-model.js 'pre'-function`)
    }
})



// Generate JWT Token
/*
JWT Token --> 
    Header ==> Contains the algorithm used for the JWT.
    Payload ==> Contains the non-sensitive user information.
    Signature ==> Used to verify the token by the server.
*/


UserSchema.methods.generateToken = async function(){
    return jwt.sign(
            { userID: this._id.toString() },

            process.env.JSON_SECRET_KEY,

            { expiresIn: '3d' }
        )
}


// Compare Password Function
UserSchema.methods.comparePassword = async function(){
    return await bcrypt.compare(password, this.password)
}


const User = mongoose.model('users', UserSchema)

module.exports = User