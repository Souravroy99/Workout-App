import { useState } from "react";
import { AuthProvider } from "../context API/AuthContext";
import { useNavigate } from "react-router-dom";

export const useSignupHook = () => {
  const [error, setError] = useState(null); 
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = AuthProvider(); // Using AuthProvider

  const navigate = useNavigate();

  const signup = async (username, email, password) => {
    console.log(username, email, password);

    setError(null);
    setIsLoading(true);

    const response = await fetch(`http://localhost:5000/api/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));  // Save the user to local storage

        dispatch({ type: "LOGIN", payload: data });  // Update the AuthContext

        navigate('/');
    } 
    else {
      setError(data.error);
    }
    setIsLoading(false);
  };

  return { signup, isLoading, error };
};
