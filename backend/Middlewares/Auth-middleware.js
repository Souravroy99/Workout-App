const User = require('../Models/user-model')
const jwt = require('jsonwebtoken')

const AuthMiddleware = async(req, res, next) => {
    const Bearer_Token = req.header("Authorization")

    if(!Bearer_Token) {
        return res.status(401).json({error: "Unauthorized HTTP, Token not provided or Invalid Token"}) ;
    }

    const token = Bearer_Token.split(" ")[1] ;

    try{
        const id = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = await User.findOne({_id: id}).select({_id:1})

        next()
    }
    catch(error){
        console.log("Auth-middleware.js ERROR: ", error)
        res.status(400).json({error: 'The user is not authorized'})
    }
}

module.exports = AuthMiddleware