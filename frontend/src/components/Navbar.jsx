import { NavLink } from "react-router-dom"
import { AuthProvider } from "../context API/AuthContext"

const Navbar = () => {

  const { user } = AuthProvider()

  return (
    <header>
        <div className="container"> 

            <NavLink to='/'>
                <h1>Workout Buddy</h1>
            </NavLink>

            <nav>

              {user 
              ? (
                  <div>
                    <span>{user.email}</span>
                    <button><NavLink to="/logout">Log Out</NavLink></button>
                  </div>
                )
              : (
                  <div>
                    <NavLink to="/login">Log In</NavLink>
                    <NavLink to="/signup">Sign Up</NavLink>
                  </div>
                )
              }
            </nav>

        </div>
    </header>
  )
}

export default Navbar