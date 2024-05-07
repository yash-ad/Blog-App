import { useState } from "react"
import {Link, useNavigate} from 'react-router-dom'
import{login as storeLogin} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from "react-redux"
import {useform} from "react-hook-form"
import authService from '../appwrite/auth'

export default function LoginForm() {

    //To navigate to the route or link here we are using
    const navigate = useNavigate();

    //To dispatch an action , we are here using 'useDispatch()' hook:-
    const dispatch = useDispatch();

    // register and handleSubmit these are methods/events which comes from 'useForm' hook.
    const { register, handleSubmit } = useForm();
  
    //State is for displaying an errors:-
    const [error,setError] = useState('');

    //'Login' method here we are using for login the form:-
    // And here we are using async/await because we are exchanging an information from an outer source:-
    const login =  async(data)=>{
        console.log(`login data:${data}`);
        // Before moving on to the login, its best practice to Empty out an errors:-
        setError("");
        //try and catch for handling response and errors:-
        try {
        //From authService there is a login method:-
        //Response will come into a 'session':-
        const session = await authService.login(data);
        console.log(`Response will come into a 'session':${session}`);
        //If there is a session then show userData and userData which comes authService.getCurrentUser()
        if(session){
            //getCurrentUser() method which comes from an authentication appwrite.
const userData = await authService.getCurrentUser();
//If there userData is available then dispatch the action which comes from authSLice login method:-
if(userData)
//In the dispatch the 'Login()' method comes form authSlice , overhere we are introducing as a 'storeLogin()'
    dispatch(storeLogin(userData));
    //If the user is logged in then navigate to the route ('/').
    navigate('/');
        }
        } catch (error) {
setError(error.message)
        }
    }
  
    return (
        <div
        className='flex items-center justify-center w-full'
        >
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
            {/* //If there is an error then display the error */}
            {/* //Here the 'error' state variable which comes from 'useState hook' with an updated state */}
            {
error && <p className="text-red-600 mt-8 text-center">{error}</p>
            }
        {/* //onSubmit attribute which is an event handler and over here handling the event or method we could say handleSubmit() which comes from 'useForm' hook:-
           // And passing the 'login' overhere which is the method we  have  created  */}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
{/* Including <Input/> component */}
<Input
    label="Email: "
    placeholder="Enter your email"
    type="email"
    //register method which comes from 'useForm' hook:-
    //Then validate to the regular expression:-
    {...register("email",{required:true, validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }})}
/>
<Input
   label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password",{
                    required: true,
                })}
/>
<Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
            </form>
        </div>
        </div>
  )
}
