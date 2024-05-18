import { useState } from 'react'; // Import useState from React for managing component state
import authService from '../appwrite/auth'; // Import authService for authentication operations
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation and useNavigate for redirecting
import { login } from '../store/authSlice'; // Import login action from authSlice for Redux state management
import { Button, Input, Logo } from './index.js'; // Import UI components
import { useDispatch } from 'react-redux'; // Import useDispatch from react-redux for dispatching actions
import { useForm } from 'react-hook-form'; // Import useForm from react-hook-form for form handling

function Signup() {
    const navigate = useNavigate(); // Initialize navigate to use for redirecting
    const [error, setError] = useState(""); // Initialize error state to handle error messages
    const dispatch = useDispatch(); // Initialize dispatch to use for dispatching Redux actions
    const { register, handleSubmit } = useForm(); // Initialize form handling using useForm

    // Function to handle account creation
    const create = async (data) => {
        setError(""); // Reset error state before starting the process
        try {
            const userData = await authService.createAccount(data); // Call authService to create account
            if (userData) {
                const userData = await authService.getCurrentUser(); // Get current user data if account creation is successful
                if (userData) dispatch(login(userData)); // Dispatch login action with user data
                navigate("/"); // Redirect to home page
            }
        } catch (error) {
            setError(error.message); // Set error message if there's an error
        }
    }

    return (
        <div className="flex items-center justify-center"> {/* Center the content */}
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}> {/* Container for the form */}
                <div className="mb-2 flex justify-center"> {/* Logo container */}
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" /> {/* Logo component */}
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2> {/* Form title */}
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In {/* Link to sign in page */}
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>} {/* Error message display */}

                <form onSubmit={handleSubmit(create)}> {/* Form submission handler */}
                    <div className='space-y-5'> {/* Spacing between form elements */}
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", { required: true })} // Register input field for full name
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                                },
                            })} // Register input field for email with validation
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: true })} // Register input field for password
                        />
                        <Button type="submit" className="w-full">
                            Create Account {/* Submit button */}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
