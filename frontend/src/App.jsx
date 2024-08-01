import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './components/Navbar'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Logout from './Pages/Logout'


function App() {

  return (
    <>
        <BrowserRouter>
          <Navbar/>

          <div className="pages">
              <Routes>

                  <Route path='/' element={<Home />}/>
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/logout' element={<Logout />} />
                    
              </Routes>
          </div>
        </BrowserRouter>
    </>
  )
}

export default App
