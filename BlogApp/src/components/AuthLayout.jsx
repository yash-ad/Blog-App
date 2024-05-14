// Importing necessary hooks and functions from React and Redux
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Creating a functional component called AuthLayout which takes children and an optional authentication prop
export default function AuthLayout({ children, authentication = true }) {
  
  // Using the useState hook to manage the loading state
  const [loading, setLoading] = useState(true);

  // Using the useNavigate hook from react-router-dom to navigate between routes
  const navigate = useNavigate();

  // Using the useSelector hook from react-redux to access the authentication status from the Redux store
  const authStatus = useSelector((state) => state.auth.status);

  // Using the useEffect hook to perform side effects in the component
  useEffect(() => {
    // Checking if authentication is required and the user is not authenticated
    if (authentication && authStatus !== authentication) {
      // Redirecting the user to the login page if not authenticated
      navigate('/login');
    } 
    // Checking if authentication is not required and the user is authenticated
    else if (!authentication && authStatus !== authentication) {
      // Redirecting the user to the home page if authenticated
      navigate('/');
    }
    // Setting loading to false after the authentication check is done
    setLoading(false);
  }, [authStatus, navigate, authentication]); // Dependencies array for useEffect

  // Returning a loading indicator while the authentication check is in progress, otherwise rendering the children
  return loading ? <h1>Loading...</h1> : <>{children}</>;
}
