import { createContext, useContext, useReducer } from "react";

// Step 1
export const WorkoutContext = createContext() 

// Step 2
export const WorkoutContextProvider = (props) => {

    const [state, dispatch] = useReducer(workoutReducer, { // useReducer ---> Need to read
        workouts: null
    })


    return (
        <WorkoutContext.Provider >
            {props.children}
        </WorkoutContext.Provider>
    )
}

