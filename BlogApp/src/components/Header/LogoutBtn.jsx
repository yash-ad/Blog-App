import { useDispatch } from 'react-redux'; // Import useDispatch for dispatching actions
import authService from '../../appwrite/auth'; // Import authService for handling authentication
import { logout } from '../../store/authSlice'; // Import logout action from authSlice

function LogoutBtn() {
    const dispatch = useDispatch(); // Initialize dispatch to use for dispatching actions

    // Function to handle logout
    const logoutHandler = () => {
        authService.logout().then(() => { // Call logout method from authService
            dispatch(logout()); // Dispatch logout action
        });
    };

    return (
        <button
            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler} // Call logoutHandler function on button click
        >
            Logout {/* Button text */}
        </button>
    );
}

export default LogoutBtn; // Export LogoutBtn component
