// Import necessary dependencies
import { useDispatch } from 'react-redux'; // Importing useDispatch hook from react-redux for dispatching actions
import authService from '../../appwrite/auth'; // Importing authentication service
import { logout } from '../../store/authSlice'; // Importing logout action from authSlice
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom for navigation

// Define LogOutBtn component
function LogOutBtn() {
  const dispatch = useDispatch(); // Get dispatch function from useDispatch hook
  const navigate = useNavigate(); // Get navigate function from useNavigate hook

  // Function to handle logout
  const logoutHandler = async () => {
    try {
      // Call logout method from authService
      await authService.logout();
      // Dispatch logout action to update Redux store
      dispatch(logout());
      // Navigate to home page after logout
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error); // Log error if logout fails
    }
  };
  
  // Return JSX for Logout button
  return (
    <>
      <button
        className="inline-bock px-6 py-2 duration-200 hover:bg-slate-700 rounded-full text-white"
        onClick={logoutHandler} // Attach logoutHandler function to onClick event
      >
        Logout
      </button>
    </>
  );
}

// Export LogOutBtn component
export default LogOutBtn;
