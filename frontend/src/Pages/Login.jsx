import { useState } from 'react'
import useLoginHook from "../hooks/useLoginHook"


const Login = () => {

  const [credentials, setCredentials] = useState({
      email: "",
      password: ""
  })
  const { loginFunc, isLoading, error }  = useLoginHook()

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
    
    await loginFunc(credentials.email, credentials.password)
  }

  return (

    <form className='login' onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <label htmlFor="email">Email: </label>
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

        <button disabled={isLoading}>Log In</button>
        
        { error && 
            <div className="error">{error}</div>
        }

    </form>
  )
}

export default Login