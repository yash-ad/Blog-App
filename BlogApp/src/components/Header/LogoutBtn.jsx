import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useDispatch } from 'react-redux';

function Logout() {
    // Dispatch function to trigger the logout action
    const dispatch = useDispatch();

    // Event handler function for logout button click
    const logoutHandler = () => {
        // Call the logout method from authService (returns a Promise)
        authService.logout()
            .then(() => {
                // If logout is successful, dispatch logout action to update Redux store
                dispatch(logout());
            })
            .catch((error) => {
                // If logout fails, log the error to the console
                console.error(error);
            });
    };

    return (
        <button
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default Logout;
