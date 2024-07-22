import { useState } from "react"
import { AuthProvider } from "../context API/AuthContext"


export const useSignupHook = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = AuthProvider()

    const signup = async(email, password) => {
        setError(null) 
        setIsLoading(true)

        const response = await fetch(`http://localhost:5000/api/user/signup`, {
            method: "POST",
            headers:{'Content-Type': "application/json"},
            body: JSON.stringify({email, password})
        })

        const data = await response.json() 

        if(response.ok) {
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(data))

            // Update the AuthContext.jsx
            dispatch({type: "LOGIN", payload: data})

            setIsLoading(false)
        }
        else {
            setIsLoading(false)
            setError(data.error)
        }
    }

    return { signup, isLoading, error }
}