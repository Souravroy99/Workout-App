const User = require('../Models/user-model');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// For SignUp
const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields must be filled" });
        }
        if (username.length < 3) {
            return res.status(400).json({ error: "Username should be at least 3 characters" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Email is not valid' });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ 
                error: `Password is not strong enough.\nUse: \n - At least 3 uppercase letters\n - At least 3 lowercase letters\n - At least 1 digit\n - At least 1 alphanumeric character` 
            });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(password, salt);

        const createdUser = await User.create({ username, email, password: hash_password });

        return res.status(200).json({ 
            message: "User successfully created",
            token: await createdUser.generateToken(),
            userId: createdUser._id.toString()
        });
    } 
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// For Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All fields must be filled" });
        }

        const userExists = await User.findOne({ email });

        if (!userExists) {
            return res.status(401).json({ error: 'Invalid login credentials!' });
        }

        const isValidPassword = await bcrypt.compare(password, userExists.password);

        if (isValidPassword) {
            return res.status(200).json({ 
                message: "User successfully logged in",
                token: await userExists.generateToken(),
                userId: userExists._id.toString()
            });
        } 
        else {
            return res.status(401).json({ error: 'Invalid login credentials!' });
        }
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { loginUser, signupUser }
