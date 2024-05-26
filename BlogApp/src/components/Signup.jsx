import { useState } from "react"; // Importing useState hook from React
import { useDispatch } from "react-redux"; // Importing useDispatch hook from React Redux to dispatch actions
import { useNavigate, Link } from "react-router-dom"; // Importing useNavigate and Link from React Router DOM for navigation
import authService from "../appwrite/auth"; // Importing authentication service
import { Button, Input, Logo } from "./index"; // Importing Button, Input, and Logo components
import { useForm } from "react-hook-form"; // Importing useForm hook from react-hook-form for form handling
import { login } from "../store/authSlice"; // Importing login action from authSlice

function Signup() {
  const navigate = useNavigate(); // Initializing navigate to use for navigation
  const dispatch = useDispatch(); // Initializing dispatch to dispatch actions
  const [error, setError] = useState(""); // Initializing error state to handle errors
  const { register, handleSubmit } = useForm(); // Initializing useForm hook for form handling

  // Function to handle form submission and create account
  const create = async (data) => {
    setError(""); // Clearing any previous errors
    try {
      // Creating account using authentication service
      const session = await authService.createAccount(data);
      if (session) {
        // If account creation is successful, fetching current user data
        const userData = await authService.getCurrentUser();
        if (userData) {
          // If user data is fetched successfully, dispatching login action
          dispatch(login(userData));
          // Navigating to home page
          navigate("/");
        }
      }
    } catch (error) {
      // Catching and handling any errors that occur during account creation
      setError(`${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center py-2">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            {/* Rendering the Logo component */}
            <Logo width="100%" />
          </span>
        </div>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          {/* Rendering a Link to the login page */}
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {/* Rendering the signup form */}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            {/* Rendering Input for full name */}
            <Input
              label="Full Name :"
              type="text"
              placeholder="Enter full name"
              {...register("name", {
                required: true,
              })}
            />
            {/* Rendering Input for email */}
            <Input
              label="Email :"
              type="email"
              placeholder="Enter your email : "
              {...register("email", {
                required: true,
                validate: {
                  // Adding email validation pattern
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            {/* Rendering Input for password */}
            <Input
              label="Password :"
              type="password"
              placeholder="Enter your Password : "
              {...register("password", {
                required: true,
              })}
            />
            {/* Rendering the Create Account Button */}
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
