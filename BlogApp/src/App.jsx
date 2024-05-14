import { useState, useEffect } from 'react'; // Importing useState and useEffect hooks from React
import { useDispatch } from 'react-redux'; // Importing useDispatch hook to dispatch actions to Redux store
import authService from "./appwrite/auth"; // Importing authentication service
import { login, logout } from "./store/authSlice"; // Importing login and logout actions from authSlice
import { Footer, Header } from './components'; // Importing Footer and Header components
import { Outlet } from 'react-router-dom'; // Importing Outlet to render nested routes

function App() {
  const [loading, setLoading] = useState(true); // State variable for loading status
  const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions

  useEffect(() => {
    // Effect hook to fetch current user data when component mounts
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          // If user data exists, dispatch login action with user data
          dispatch(login({ userData }));
        } else {
          // If no user data, dispatch logout action
          dispatch(logout());
        }
      })
      .catch((error) => {
        // Error handling: dispatch logout action on error
        console.error("Error fetching user data:", error);
        dispatch(logout());
      })
      .finally(() => setLoading(false)); // Set loading state to false after fetching user data
  }, [dispatch]); // Dependency array with dispatch to ensure effect runs only once

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'> {/* Main container with flex layout */}
      <div className='w-full block'> {/* Full-width container */}
        <Header /> {/* Rendering Header component */}
        <main>
          {!loading && <Outlet />} {/* Rendering nested routes only when loading is complete */}
        </main>
        <Footer /> {/* Rendering Footer component */}
      </div>
    </div>
  );
}

export default App; // Exporting App component as default
