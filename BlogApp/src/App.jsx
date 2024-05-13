import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          {!loading && <Outlet />}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
