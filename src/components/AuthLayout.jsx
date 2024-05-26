import { useEffect, useState } from 'react'; // Importing necessary hooks from React
import { useSelector } from 'react-redux'; // Importing useSelector hook to access Redux store
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation

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

    // Show loading message while loader is true, otherwise render children
    return loader ? <h1>Loading...</h1> : <>{children}</>;
}
