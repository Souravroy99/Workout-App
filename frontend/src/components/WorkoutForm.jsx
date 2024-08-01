import { useState } from 'react'
import { useWorkoutContext } from "../context API/WorkoutContext"


const WorkoutForm = () => {

    const [workoutInfo, setWorkoutInfo] = useState({
        title:"",
        reps:"",
        load:"", 
    })
    const [error, setError] = useState(null)
    const [emptyField, setEmptyFields] = useState([])
    const user  = JSON.parse(localStorage.getItem('user'));

    if(!user) {
        return alert("You must be logged in");
    }


    const handleInput = async(e) => {
        const name = e.target.name
        const value = e.target.value

        setWorkoutInfo((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const { dispatch } = useWorkoutContext() ;

    // Creating New Workout
    const handleSubmit = async(event) => {
        event.preventDefault()

        try{
            const response = await fetch(`http://localhost:5000/api/workouts/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },

                body: JSON.stringify(workoutInfo),
            })

            const data = await response.json() 

            if(response.ok){
                dispatch({type: "CREATE_WORKOUT", payload: data})
                setWorkoutInfo({
                    title:"",
                    load:"",
                    reps:""
                }) 
                setError(null);
                setEmptyFields([]);
                alert('Workout Successfully Added');
            }
            else{
                setError(data.error);
                setEmptyFields(data.emptyFields);
            }
        }
        catch(error){
            alert(`Oops! Server Error`)
            console.log('Handle Submit Error WorkoutForm.jsx')
        }
    }


  return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>

        <label htmlFor="title">Exercise Title:</label>
        <input 
            type="text" 
            name='title'
            autoComplete='off'    
            required
            value={workoutInfo.title}
            onChange={handleInput}
            className={emptyField.includes('title') ? "error" : "" }
        />


        <label htmlFor="load">Load (in Kg):</label>
        <input 
            type="number" 
            name='load' 
            autoComplete='off'    
            required
            value={workoutInfo.load}
            onChange={handleInput}
            className={emptyField.includes('load') ? "error" : "" }
        />


        <label htmlFor="reps">Reps</label>
        <input 
            type="number" 
            name='reps' 
            autoComplete='off'    
            required
            value={workoutInfo.reps}
            onChange={handleInput}
            className={emptyField.includes('reps') ? "error" : "" }
        />

        <button className='btn'>Add Workout</button>

        {error && <div className='error'>{error}</div>}

    </form>
  )
}

export default WorkoutForm