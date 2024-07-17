const mongoose = require('mongoose')

const URI = process.env.Mongo_URI 

const Database = async() => {
    try{
        await mongoose.connect(URI);
        console.log(`Successfully Connected to Database`)
    }
    catch(error){
        console.log(`Database.js Connection Failed: ${error}`)
        process.exit(0) ;
    }
}

module.exports = Database