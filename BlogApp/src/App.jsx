import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from "./store/authSlice";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  // State to manage loading status before handling network requests
  const [loading, setLoading] = useState(true);

  // Dispatch function to trigger actions to update Redux store
  const dispatch = useDispatch();

  // useEffect hook to fetch current user data from AuthService when the component mounts
  useEffect(() => {
    // Fetch current user data from AuthService
    authService.getCurrentUser()
      .then((userData) => {
        // If userData is available (user is logged in), dispatch login action to update Redux store
        if (userData) {
          dispatch(login({ userData }));
        } else {
          // If userData is not available (user is not logged in), dispatch logout action to update Redux store
          dispatch(logout());
        }
      })
      // Set loading to false after fetching current user data, whether successful or not
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Conditional rendering using ternary operator: If loading is false, render the main content, else render null
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        {/* Render Header component */}
        <Header />
        <main>
          {/* Render nested routes */}
          <Outlet />
        </main>
        {/* Render Footer component */}
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
