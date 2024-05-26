import { useState } from 'react'; // Importing useState hook from React
import { Link, useNavigate } from 'react-router-dom'; // Importing Link and useNavigate from react-router-dom
import { login as authLogin } from '../store/authSlice'; // Importing the login action from authSlice
import { Button, Input, Logo } from "./index"; // Importing Button, Input, and Logo components
import { useDispatch } from "react-redux"; // Importing useDispatch hook from react-redux
import authService from "../appwrite/auth"; // Importing authService from appwrite/auth
import { useForm } from "react-hook-form"; // Importing useForm hook from react-hook-form

function Login() {
    const navigate = useNavigate(); // Initializing navigate to use for navigation
    const dispatch = useDispatch(); // Initializing dispatch to dispatch actions to Redux store
    const { register, handleSubmit } = useForm(); // Destructuring register and handleSubmit functions from useForm hook
    const [error, setError] = useState(""); // Initializing error state to handle login errors

    // Function to handle login submission
    const login = async(data) => {
        setError(""); // Clearing any previous error
        try {
            const session = await authService.login(data); // Calling the login function from authService with provided data
            if (session) { // If login is successful
                const userData = await authService.getCurrentUser(); // Getting current user data
                if(userData) dispatch(authLogin(userData)); // Dispatching the authLogin action with user data
                navigate("/"); // Redirecting to home page
            }
        } catch (error) { // If login fails
            setError(error.message); // Setting the error message
        }
    }

    return (
        <div className='flex items-center justify-center w-full py-4'>
            <div className={`mx-auto w-full max-w-lg bg-highlight-color dark:bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" /> {/* Rendering the Logo component */}
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup" // Redirecting to signup page
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>} {/* Displaying error message if present */}
                <form onSubmit={handleSubmit(login)} className='mt-8'> {/* Handling form submission */}
                    <div className='space-y-5'>
                        <Input
                            label="Email: " // Label for email input
                            placeholder="Enter your email" // Placeholder for email input
                            type="email" // Type of input (email)
                            {...register("email", { // Registering email input with form validation rules
                                required: true, // Email is required
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || // Validating email format
                                    "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: " // Label for password input
                            type="password" // Type of input (password)
                            placeholder="Enter your password" // Placeholder for password input
                            {...register("password", { // Registering password input with form validation rules
                                required: true, // Password is required
                            })}
                        />
                        <Button
                            type="submit" // Setting button type to submit
                            className="w-full" // Setting button width to full width
                        >
                            Sign in {/* Button text */}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login; // Exporting the Login component
