import formatDistanceToNow  from "date-fns/formatDistanceToNow"
import { useWorkoutContext } from "../context API/WorkoutContext";

const WorkoutDetails = ({ workout }) => {

  const { dispatch } = useWorkoutContext() ;
  const user = JSON.parse(localStorage.getItem('user'));

  if(!user) {
    return ;
  }

  const handleRemove = async() => {
    try{
      const response = await fetch(`http://localhost:5000/api/workouts/${workout._id}`,{
        method: "DELETE",
        headers: {"Authorization": `Bearer ${user.token}`}
      })

      const data = response.json() ;

      if(response.ok) {
          dispatch({type: "DELETE_WORKOUT", payload: data}) ;
      }
      else {
          alert("ERROR!") ;
          console.log('Delete response is not OK') ;
      }
    }
    catch(error) {
      console.log("Server Error: ", error) ;
    }
  }

  return (
    <div className='workout-details'>

        <h4>{workout.title}</h4>
        <p><strong>Load (Kg): </strong>{workout.load}</p>
        <p><strong>Reps: </strong>{workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>

        <span className="material-symbols-outlined" onClick={handleRemove}>Delete</span>
    </div>
  )
}

export default WorkoutDetails;