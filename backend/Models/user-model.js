const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true});

// Generate JWT Token
/*
JWT Token --> 
    Header ==> Contains the algorithm used for the JWT.
    Payload ==> Contains the non-sensitive user information.
    Signature ==> Used to verify the token by the server.
*/

UserSchema.methods.generateToken = async function() {
    return jwt.sign(
        { userID: this._id.toString() },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '3d' }
    );
}

const User = mongoose.model('users', UserSchema);

module.exports = User;
