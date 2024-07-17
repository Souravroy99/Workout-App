import { useState, useEffect } from "react"
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";


const Home = () => {

  const [workouts, setWorkouts] = useState([]) ;

  const fetchWorkouts = async() => {
    try{

      const response = await fetch(`/api/workouts`, { // Using "proxy"('package.json' file) instead of "cors"
        method:"GET"
      })
      
      const data = await response.json() ;
      
      if(response.ok) {
        setWorkouts(data) ;
      }
      else{
        console.log(`fetchWorkouts Response is not ok`)
      }
    }
    catch(error){
       alert(`fetchWorkouts ERROR!`)
    }
    
  }

  useEffect(()=>{
    fetchWorkouts() ;
  }, [])

  return (
    <div className="home">
        <div className="workouts">
          {workouts && workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout}/> // Here, key and workout are "props"
          ))}
        </div>
        <WorkoutForm/>
    </div>
  )
}

export default Home 