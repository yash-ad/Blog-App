// Import necessary hooks from React and Redux
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Import authentication service and authSlice actions
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";

// Import necessary components and Outlet for routing
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

// Main App component
function App() {
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  
  // Redux dispatch hook
  const dispatch = useDispatch();

  // Effect hook to run once on component mount
  useEffect(() => {
    // Function to get current user data from authentication service
    authService.getCurrentUser()
      .then((userData) => {
        // If user data exists, dispatch login action with user data
        if (userData) {
          dispatch(login({ userData }));
        } else {
          // If no user data, dispatch logout action
          dispatch(logout());
        }
      })
      // Finally, set loading to false
      .finally(() => setLoading(false));
  }, []); // Dependency array, runs effect only on mount

  // Return the JSX based on loading status
  return !loading ? (
    // Main layout structure
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        {/* Header component */}
        <Header />
        {/* Main content */}
        <main>
          {/* Outlet for rendering nested routes */}
          <Outlet />
        </main>
        {/* Footer component */}
        <Footer />
      </div>
    </div>
  ) : null; // Render nothing while loading
}

// Export the App component
export default App;
