import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { WorkoutContextProvider } from './context API/WorkoutContext.jsx'
import { AuthContextProvider } from './context API/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(

  <AuthContextProvider>

      <WorkoutContextProvider>

          <React.StrictMode>
              <App />
          </React.StrictMode>,

      </WorkoutContextProvider>

  </AuthContextProvider>
  
)
