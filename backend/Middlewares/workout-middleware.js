const WorkoutMiddleware = async(req, res, next) => {
    // try{
        console.log(req.path, req.method) 
        next() ;
    // }
    // catch(error){
    //     console.log(`Auth-Middleware Error`)
    // }
}

module.exports = WorkoutMiddleware