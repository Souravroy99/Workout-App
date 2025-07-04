import { createContext, useContext, useReducer } from "react";

// Step 1
export const WorkoutContext = createContext() 


 

// Step 2
export const WorkoutContextProvider = (props) => {

    const workoutReducer = (prevState, action) => {

        switch (action.type) {
            case "SET_WORKOUTS": return { workouts: action.payload};
            case 'CREATE_WORKOUT': return { workouts: [action.payload, ...prevState.workouts]};
            case 'DELETE_WORKOUT': return { workouts: prevState.workouts.filter((work) => work._id !== action.payload._id)};
            default: return prevState;
        }
    }

    const initialState = { workouts: [] }
    const [state, dispatch] = useReducer(workoutReducer, initialState);
    const workouts = state.workouts;

    return (
        <WorkoutContext.Provider value={{...state, workouts,dispatch}}>
            {props.children}
        </WorkoutContext.Provider>
    )
}

// Step 3
export const useWorkoutContext = () => {
    return useContext(WorkoutContext) ;
}