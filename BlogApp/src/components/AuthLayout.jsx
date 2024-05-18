import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate(); // Initialize navigate to use for redirecting
    const [loader, setLoader] = useState(true); // Initialize loader state to handle loading state
    const authStatus = useSelector(state => state.auth.status); // Get authentication status from Redux state

    useEffect(() => {
        // Check authentication status and redirect accordingly
        if (authentication && authStatus !== authentication) {
            navigate("/login"); // Redirect to login if authentication is required but not present
        } else if (!authentication && authStatus !== authentication) {
            navigate("/"); // Redirect to home if authentication is not required but present
        }
        setLoader(false); // Set loader to false after checking authentication status
    }, [authStatus, navigate, authentication]); // Dependency array for useEffect

    return loader ? <h1>Loading...</h1> : <>{children}</>; // Show loading message while loader is true, otherwise render children
}
