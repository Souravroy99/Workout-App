import { NavLink } from "react-router-dom"
import useLogoutHook from "../hooks/useLogoutHook"
import { AuthProvider } from "../context API/AuthContext"

const Navbar = () => {

  const { logout } = useLogoutHook()
  const { user } = AuthProvider()

  const handleClick = () => {
      logout()
  }

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
                    <button onClick={handleClick}>Log out</button>
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