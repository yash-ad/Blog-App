
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
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App; // Exporting App component as default
