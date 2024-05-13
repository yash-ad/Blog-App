import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



 //AuthLayout Manages authentication-related logic and controls access to routes.
// Indicates if authentication is required (default: true)
//  Child components to be rendered within the layout

function AuthLayout({ children, authentication = true }) {
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Hook for navigation within the application
  const navigate = useNavigate();
  
  // Access the authentication status from Redux store
  const authStatus = useSelector((state) => state.auth.status);

  // useEffect to handle side-effects and authentication logic
  useEffect(() => {
    // Check if authentication is required and user is not authenticated
    if (authentication && !authStatus) {
      // Redirect to login page
      navigate('/login');
    } 
    // Check if authentication is not required and user is authenticated
    else if (!authentication && authStatus) {
      // Redirect to home page
      navigate('/');
    }
    // Update loading state after authentication check
    setLoading(false);
    // Dependencies for useEffect
  }, [authStatus, navigate, authentication]);

  // Render loading message or child components
  return loading ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthLayout;
