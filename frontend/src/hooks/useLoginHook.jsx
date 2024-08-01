import { useState } from "react";
import { AuthProvider } from "../context API/AuthContext";
import { useNavigate } from "react-router-dom";

const useLoginHook = function () {
    
  const { dispatch } = AuthProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const loginFunc = async (email, password) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
        navigate("/");
      } else {
        setError(data.error);
      }
    } catch (err) {
        setError(err.error);
    } finally {
        setIsLoading(false);
    }
  };

  return { loginFunc, isLoading, error };
};

export default useLoginHook;
