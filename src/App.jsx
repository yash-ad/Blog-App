import { useEffect, useState,Suspense ,lazy} from "react"; // Importing useEffect and useState hooks from React
import { useDispatch } from "react-redux"; // Importing useDispatch hook from React Redux
import { login, logout } from "./store/authSlice"; // Importing login and logout actions from the authSlice
import { Footer, Header } from "./components"; // Importing Footer and Header components
import { Outlet } from "react-router-dom"; // Importing Outlet component from react-router-dom
import authService from "./appwrite/auth.js"; // Importing authService for authentication logic



function App() {
  const [loading, setLoading] = useState(true); // Loading state is initialized to true to manage the loading state while fetching user data .
  const dispatch = useDispatch(); // useDispatch hook to dispatch actions to Redux store

  useEffect(() => {
    //An asynchronous function 'fetchCurrentUser' is defined to fetch the current user data.
    const fetchCurrentUser = async () => {
      try {
        //getCurrentUser() method or function is called to fetch user data.
        const userData = await authService.getCurrentUser(); // Fetching current user data from authService
        
        //if the userData exists then dispatches an action calls to the reducer function which is login overhere.
        if (userData) {
          // Dispatching login action with user data if user is authenticated.
          // The 'login' action updates the redux store Autentication state with the userData.
          dispatch(login({ userData }));
        } else {
          // Dispatching logout action if no user data is available
          dispatch(logout()); 
        }
      } catch (error) {
        // Logging error if fetching current user fails
        console.error("Error fetching current user:", error); 
        // Dispatching logout action on error
        dispatch(logout()); 
      } finally {
        // Setting loading state to false after fetching current user data
        setLoading(false); 
      }
    };
// Call fetchCurrentUser function when component mounts ,here component mounts means that In react component mounting is the process of adding a component to the DOM, this happens when component is created , when its updated and needs to be re-rendered.
    fetchCurrentUser(); 
    // Adding dispatch to dependency array to avoid lint warnings and ensure the effect only runs when there is a change in 'dispatch'.
  }, [dispatch]); 


  // Conditional Rendering
  if (loading) {
    return null; // Show nothing or a loader while loading
  }

  return (
    <>
    
      <Header /> {/* Rendering Header component TOP*/}
      <main className="min-h-screen py-6">
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet /> {/* Rendering Outlet component to render nested  child routes */}
        </Suspense>
      </main>
      <Footer /> {/* Rendering Footer component BOTTOM*/}
    </>
  );
}

export default App; // Exporting the App component as default
