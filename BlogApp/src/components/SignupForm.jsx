import { useState } from "react" //useState hook is used to manage the state in functional components:-
import authService from "../appwrite/auth"
import{login as storeLogin} from '../store/authSlice'
import{Link,useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {Button,Input,Logo} from './index'
import { useForm } from "react-hook-form"

function SignupForm() {
 //State is for displaying an errors:-
    const [error,setError] = useState('');

 //To navigate to the route or link here we are using useNavigate():-
    const navigate = useNavigate();

 //To dispatch an action , we are here using 'useDispatch()' hook:-
    const dispatch = useDispatch();

// register and handleSubmit these are methods/events which comes from 'useForm' hook.
    const {register,handleSubmit} = useForm();

// Lets create a signup(createAccount) method for event handling:-
// And here we are using async/await because we are exchanging an information from an outer source:-

const createSignup = async(data)=>{
try {
      //From authService there is a Signup (createAccount) method:-
        //Response will come into a 'session' and it takes time because its from an outer source:-
   const session =  await authService.createAccount(data);
   if(session){
   const userData =  await authService.getCurrentUser();
   if(userData){
    dispatch(storeLogin(userData))
      //If the user is logged in then navigate to the route ('/').
      navigate('/')
   }
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
                {/* //Lets start classic javascript:- */}
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
<form onSubmit={handleSubmit(createSignup)}>
<div className='space-y-5'>
<Input
    label="Full Name: "
    placeholder="Enter your full name"
    type="text"
{...register('name',{required:true,
})}
/>
<Input
     label="Email: "
     placeholder="Enter your email"
     type="email"
     {
    ...register('email',{required:true, validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }})
     }
/>
<Input
    label="Password"
    placeholder="Enter your password"
    type="password"
    {
        ...register('password',{
            required:true
        })
    }
/>
<Button> Create Account</Button>
</div>
</form>
        </div>  
    </div>
  )
}


export default SignupForm