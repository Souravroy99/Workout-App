import { useState } from 'react'

const Login = () => {

  const [credentials, setCredentials] = useState({
      email: "",
      password: ""
  })

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


      const response = await fetch(`http://localhost:5000/api/user/signup`, {
          method: "POST",
          headers:{'Content-Type': "application/json"},
          body: JSON.stringify(credentials)
      })

      const data = response.json() 

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

        <button>Log In</button>
        
    </form>



  )
}

export default Login