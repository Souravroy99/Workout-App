// import { useState } from 'react'
// import { AuthProvider } from '../context API/AuthContext'

// const useLoginHook = function() {

//     const { dispatch } = AuthProvider()
//     const [isLoading, setIsLoading] = useState(null)
//     const [error, setError] = useState(null)

//     const loginFunc = async(email, password) => {
        
//         setError(null) 
//         setIsLoading(true)
                                     
//         const response = await fetch(`http://localhost:5000/api/user/login`, {
//             method: "POST",
//             headers: {'Content-Type': "application/json"},
//             body: JSON.stringify(email, password)
//         })

//         const data = response.json()

//         if(response.ok) {
//             setIsLoading(false)

//             localStorage.setItem('user', data)
//             dispatch({type: "LOGIN", payload: data})
//         }
//         else {
//             setError(data.error)
//             setIsLoading(false)
//         }
//     }
    
//     return { loginFunc, isLoading, error }
// }

// export default useLoginHook






import { useState } from 'react'
import { AuthProvider } from '../context API/AuthContext'

const useLoginHook = function() {
    const { dispatch } = AuthProvider
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const loginFunc = async (email, password) => {
        setError(null)
        setIsLoading(true)
                                     
        const response = await fetch(`http://localhost:5000/api/user/login`, {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if (response.ok) 
        {
            localStorage.setItem('user', data)
            dispatch({ type: "LOGIN", payload: data })
        } 
        else 
        {
            setError(data.error)
        }
        setIsLoading(false)
    }
    
    return { loginFunc, isLoading, error }
}

export default useLoginHook