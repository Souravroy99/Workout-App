import {useEffect} from 'react';
import { AuthProvider } from '../context API/AuthContext';
import { Navigate } from 'react-router-dom';

function Logout() {

    const { logout } = AuthProvider();

    useEffect(() => {
        logout();
    },[]);

    return <Navigate to="/login" /> ;
}

export default Logout;