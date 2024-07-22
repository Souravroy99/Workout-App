import { useEffect } from "react"
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../context API/WorkoutContext";
import { AuthProvider } from "../context API/AuthContext";


const Home = () => {

  const {workouts, dispatch} = useWorkoutContext() 
  const { user } = AuthProvider()

  const fetchWorkouts = async() => {
    try {
        const response = await fetch(`https://localhost:4000/api/workouts/all`, { 
          method:"GET",
          headers:{'Authorization': `Bearer ${user.token}`}
        })
        
        const data = await response.json() ;
        
        if(response.ok) {
            dispatch({type: "SET_WORKOUTS", payload: data}) ;
        }
        else {
            console.log(`fetchWorkouts Response is not ok`)
        }
      }
    catch(error) {
        alert(`fetchWorkouts ERROR!`)
      }
  }

  useEffect(() => {
      fetchWorkouts() ;
  }, [dispatch])

  return (
      <div className="home">
          <div className="workouts">
              {
                workouts && workouts.map((workout) => {
                  return (
                    
                    <WorkoutDetails key={workout._id} workout={workout}/> // Here, workout is a "props"

                  )
                })
              }
          </div>

          <WorkoutForm/>
          
      </div>
    )
}

export default Home 