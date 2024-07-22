import { useState } from 'react'
import { useSignupHook } from "../hooks/useSignupHook"

const Signup = () => {

  const [credentials, setCredentials] = useState({
      email: "",
      password: ""
  })
  
  const { signup, isLoading, error } = useSignupHook()

  const handleInput = async(e) => {
      const name = e.target.name
      const value = e.target.value

      setCredentials((prev) => ({
          ...prev,
          [name] : value
      }))
  }

  const handleSubmit = async(e) => {
      e.preventDefault();

      await signup(credentials.email, credentials.password)
  }

  return (

    <form className='signup' onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <label htmlFor="email">Email</label>
        <input 
              type="email" 
              name='email'
              autoCapitalize='off'
              required
              value={credentials.email}
              onChange={handleInput}
        />

        <label htmlFor="password">Password: </label>
        <input 
              type="password" 
              name='password'
              autoCapitalize='off'
              required
              value={credentials.password}
              onChange={handleInput}
        />

        <button disabled={isLoading}>Sign Up</button>
 
        { error && <div className="error">{error}</div> }

    </form>

  )
}

export default Signup





// import { useState } from "react"
// import { useSignupHook } from "../hooks/useSignupHook"

// const Signup = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const {signup, error, isLoading} = useSignupHook()

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     await signup(email, password)
//   }

//   return (
//     <form className="signup" onSubmit={handleSubmit}>
//       <h3>Sign Up</h3>
      
//       <label>Email address:</label>
//       <input 
//         type="email" 
//         onChange={(e) => setEmail(e.target.value)} 
//         value={email} 
//       />
//       <label>Password:</label>
//       <input 
//         type="password" 
//         onChange={(e) => setPassword(e.target.value)} 
//         value={password} 
//       />

//       <button disabled={isLoading}>Sign up</button>
//       {error && <div className="error">{error}</div>}
//     </form>
//   )
// }

// export default Signup