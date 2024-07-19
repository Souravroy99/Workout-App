import { createContext, useContext, useReducer } from "react"

// Step 1
export const AuthContext = createContext() 

// Step 2
export const AuthContextProvider = (props) => {

    const authReducer = (state, action) => {
        switch (action.type){
            case "LOGIN" : return { user: action.payload }
            case "LOGOUT" : return { user: null }
            default : return state
        }
    }

    const initialState = {user: null}
    const [state, dispatch] = useReducer(authReducer, initialState) 

    console.log(`AuthContext State: ${state}`)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}

// Step 3
export const AuthProvider = () => {
    return useContext(AuthContext) 
}