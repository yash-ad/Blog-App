import { useEffect, useState } from "react"; // Importing useEffect and useState hooks from React
import { useDispatch } from "react-redux"; // Importing useDispatch hook from React Redux
import { login, logout } from "./store/authSlice"; // Importing login and logout actions from the authSlice
import { Footer, Header } from "./components"; // Importing Footer and Header components
import { Outlet } from "react-router-dom"; // Importing Outlet component from react-router-dom
import authService from "./appwrite/auth.js"; // Importing authService for authentication logic

function App() {
  const [loading, setLoading] = useState(true); // State to manage loading state
  const dispatch = useDispatch(); // useDispatch hook to dispatch actions to Redux store

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userData = await authService.getCurrentUser(); // Fetching current user data from authService
        if (userData) {
          dispatch(login({ userData })); // Dispatching login action with user data if user is authenticated
        } else {
          dispatch(logout()); // Dispatching logout action if no user data is available
        }
      } catch (error) {
        console.error("Error fetching current user:", error); // Logging error if fetching current user fails
        dispatch(logout()); // Dispatching logout action on error
      } finally {
        setLoading(false); // Setting loading state to false after fetching current user data
      }
    };

    fetchCurrentUser(); // Call fetchCurrentUser function when component mounts
  }, [dispatch]); // Adding dispatch to dependency array to avoid lint warnings

  if (loading) {
    return null; // Show nothing or a loader while loading
  }

  return (
    <>
      <Header /> {/* Rendering Header component */}
      <main className="min-h-screen py-6">
        <Outlet /> {/* Rendering Outlet component to render nested routes */}
      </main>
      <Footer /> {/* Rendering Footer component */}
    </>
  );
}

export default App; // Exporting the App component as default
