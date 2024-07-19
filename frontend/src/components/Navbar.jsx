import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <header>
        <div className="container">

            <NavLink to='/'>
                <h1>Workout Buddy</h1>
            </NavLink>

            <nav>
              <div>

                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>

              </div>
            </nav>

        </div>
    </header>
  )
}

export default Navbar