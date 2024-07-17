import { useState } from 'react'

const WorkoutForm = () => {

    const [workoutInfo, setWorkoutInfo] = useState({
        title:"",
        reps:"",
        load:"",
    })
    const [error, setError] = useState(null)

    const handleInput = async(e) => {
        const name = e.target.name
        const value = e.target.value

        setWorkoutInfo((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    // Creating New Workout
    const handleSubmit = async(event) => {
        event.preventDefault()

        try{
            const response = await fetch(`/api/workouts`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(workoutInfo),
            })

            const data = await response.json() 

            if(response.ok){
                setWorkoutInfo({
                    title:"",
                    load:"",
                    reps:""
                }) 
                setError(null)
                alert('Workout Successfully Added')
            }
            else{
                setError(data.error)
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
        />


        <label htmlFor="load">Load (in Kg):</label>
        <input 
            type="number" 
            name='load' 
            autoComplete='off'    
            required
            value={workoutInfo.load}
            onChange={handleInput}
        />


        <label htmlFor="reps">Reps</label>
        <input 
            type="number" 
            name='reps' 
            autoComplete='off'    
            required
            value={workoutInfo.reps}
            onChange={handleInput}
        />

        <button className='btn'>Add Workout</button>

        {error && <div className='error'>{error}</div>}

    </form>
  )
}

export default WorkoutForm