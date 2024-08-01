import { useEffect } from "react"
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../context API/WorkoutContext";


const Home = () => {

  const {workouts, dispatch} = useWorkoutContext() ;
  const user = JSON.parse(localStorage.getItem('user'));

  // console.log(user.userId);

  const fetchWorkouts = async() => {
    try { 
        const response = await fetch(`http://localhost:5000/api/workouts/getAll`, { 
          method:"GET",
          headers:{'Authorization': `Bearer ${user.token}`}
        })
        
        const data = await response.json();
        console.log(data);
        
        if(response.ok) {
            dispatch({type: "SET_WORKOUTS", payload: data});
        }
        else {
            console.log(`fetchWorkouts Response is not ok`);
        }
      }
    catch(error) {
        console.log(`fetchWorkouts ERROR!`);
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