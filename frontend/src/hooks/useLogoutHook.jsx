import {useState} from 'react'
import { AuthProvider } from '../context API/AuthContext'

const useLogoutHook = async() => {

    const { dispatch } = AuthProvider()

    const logout = async() => {

        // Remove user from local storage
        localStorage.removeItem('user')

        // Globally deactivate the user(inside of user --> email, token, userId)
        dispatch({type: "LOGOUT"})
    }


  return { logout }
}

export default useLogoutHook