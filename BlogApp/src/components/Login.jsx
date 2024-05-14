import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { login as storeLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from "react-redux";
import authService from '../appwrite/auth';
import { useForm } from "react-hook-form";

export  function Login() {
    // Hook to navigate to different routes
    const navigate = useNavigate();

    // Hook to dispatch actions
    const dispatch = useDispatch();

    // useForm hook to manage form state and methods
    const { register, handleSubmit } = useForm();

    // State to hold error messages
    const [error, setError] = useState('');

    // Function to handle form submission and login
    const createLogin = async (data) => {
        // Clear any previous error messages
        setError("");

        try {
            // Attempt to login with provided credentials
            const session = await authService.login(data);

            // If login is successful, retrieve user data
            if (session) {
                const userData = await authService.getCurrentUser();

                // Dispatch login action with user data
                if (userData) {
                    dispatch(storeLogin(userData));
                    // Navigate to home page after successful login
                    navigate('/');
                }
            }
        } catch (error) {
            // Display error message if login fails
            setError(error.message);
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
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {/* Display error message if present */}
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {/* Login form */}
                <form onSubmit={handleSubmit(createLogin)} className='mt-8'>
                    <div className='space-y-5'>
                        {/* Input fields for email and password */}
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            // Register email input with validation
                            {...register("email", { required: true, validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }})}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            // Register password input with validation
                            {...register("password", { required: true })}
                        />
                        {/* Submit button */}
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
