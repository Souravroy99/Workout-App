const User = require('../Models/user-model');
const jwt = require('jsonwebtoken');

const AuthMiddleware = async (req, res, next) => {
    const Bearer_Token = req.header("Authorization");

    // console.log(Bearer_Token);

    if (!Bearer_Token) {
        return res.status(401).json({ error: "Unauthorized HTTP, Token not provided or Invalid Token" });
    }

    const token = Bearer_Token.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(decoded);

        req.userId = await User.findOne({ _id: decoded.userID }).select({ _id: 1 });

        if (!req.userId) {
            return res.status(401).json({ error: "Unauthorized HTTP, User not found" });
        }

        next();
    } catch (error) {
        // console.log("Auth-middleware.js ERROR: ", error);
        res.status(401).json({ error: 'The user is not authorized' });
    }
}

module.exports = AuthMiddleware;
