import { useState,useEffect } from "react"
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import { login,logout } from "./store/authSlice";
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {Outlet} from 'react-router-dom'

function App() {

//Lets create a loading state ofr handling the network requests, because it takes time for the newtwork request
//Until then we should handle the network request.
const [loading,setLoading] = useState(true);

//It dispatches an action and calls to the reducer function.
const dispatch = useDispatch();

//So whenever the application loads or run , should ask to the user if user is available or not
//Using 'useEffect' Hook:-

useEffect(()=>{
//authService and its currentUser from appWrite there is method called 'getCurrentUser()':-
authService.getCurrentUser()
//If successfully Data is fetched then store the data into the 'userData' its a variable  in the '.then()'
.then((userData)=>{
//Lets check for a condition  , is there  'userData' that means the currentUser is then show the data
if(userData){
  dispatch(login({userData}))
}
//And if there is currentUser is not available then else update the state.
else{
dispatch(logout())
}
})
//Because the loading has been finished then update the state using setLoading() to false.
.finally(()=>{
  setLoading(false);
})
},[])

 //Conditional rendering using ternary operator:-
 //If loading is not true that means its false then show this or other wise then show this:-
 return !loading ?(
  <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
  <div className="w-full block" >
<Header/>
<main>
  Todo:<Outlet/>
</main>
<Footer/>
  </div>
  </div>
 ) : null
}

export default App
