import { useEffect, useState } from 'react'; // Importing necessary hooks from React
import { useSelector } from 'react-redux'; // Importing useSelector hook to access Redux store
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation


// The Protected component takes children (React components to render) and an authentication prop that defaults to true. 
//This prop determines if authentication is required to view the children.
export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate(); // Initialize navigate to use for redirecting and navigating to the routes.
    const [loader, setLoader] = useState(true); // Initialize loader state to handle loading state.
    //'authStatus' is retrieved from the Redux store to check if the user is autheticated.
    const authStatus = useSelector(state => state.auth.status); // Get authentication status from Redux state.


  
    //useEffect is used for side effects in functional components.
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
