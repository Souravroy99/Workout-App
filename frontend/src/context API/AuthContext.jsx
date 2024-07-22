import { createContext, useContext, useReducer, useEffect } from "react"

// Step 1
export const AuthContext = createContext() 

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN" : return { user: action.payload }  // Inside of user --> email, token, userId
        case "LOGOUT" : return { user: null }
        default : return state
    }
}

// Step 2
export const AuthContextProvider = (props) => {

    const initialState = {user: null}
    const [state, dispatch] = useReducer(authReducer, initialState) 

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if(user) {
            console.log(`AuthContext State: ${state}     and         ${user}`)
            dispatch({type: "LOGIN", payload: user})
        }
    }, [])


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