import { createContext, useContext, useReducer, useEffect } from "react"

// Step 1
export const AuthContext = createContext() 


const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN" : return { user: action.payload }  // Inside of 'user' --> email, token, userId
        case "LOGOUT" : return { user: null }
        default : return state
    }
}

// Step 2
export const AuthContextProvider = ({children}) => {

    const initialState = {user: null}
    const [state, dispatch] = useReducer(authReducer, initialState);

    const isLoggedIn = !!state.user ;
    const user = state.user ;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if(user) {
            dispatch({type: "LOGIN", payload: user})
        }
    }, [dispatch]);

    const logout = () => {
        // Remove user from local storage
        localStorage.removeItem('user');

        // Globally deactivate the user(inside of user --> email, token, userId)
        dispatch({type: "LOGOUT"});
    }


    return (
        <AuthContext.Provider value={{...state, dispatch, user, logout, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    ) 
}

// Step 3
export const AuthProvider = () => {
    return useContext(AuthContext) 
}