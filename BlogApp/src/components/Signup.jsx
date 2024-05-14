import { useState } from "react"; // Import useState hook for managing state in functional components
import authService from '../appwrite/auth' // Import authService for authentication
import { login as storeLogin } from '../store/authSlice'; // Import login action from authSlice
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation
import { useDispatch } from 'react-redux'; // Import useDispatch for dispatching actions
import { Button, Input, Logo } from './index'; // Import Button, Input, and Logo components
import { useForm } from "react-hook-form"; // Import useForm for handling form inputs

export function SignupForm() {
    // State for displaying errors
    const [error, setError] = useState('');

    // Navigate to the route
    const navigate = useNavigate();

    // Dispatch function
    const dispatch = useDispatch();

    // useForm hook methods for handling form inputs
    const { register, handleSubmit } = useForm();

    // Signup method for event handling
    const createSignup = async (data) => {
        setError(""); // Clear previous errors
        try {
            // Call createAccount method from authService
            const session = await authService.createAccount(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(storeLogin(userData)); // Dispatch login action with user data
                    navigate('/'); // Navigate to the home route
                }
            }
        } catch (error) {
            setError(error.message); // Set error message if there's an error
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {/* Render error message if there's any */}
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {/* Form for signup */}
                <form onSubmit={handleSubmit(createSignup)}>
                    <div className='space-y-5'>
                        {/* Input fields for full name, email, and password */}
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            type="text"
                            {...register('name', { required: true })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            {...register('password', { required: true })}
                        />
                        {/* Button to submit the form */}
                        <Button> Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}


