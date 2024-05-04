
//We need an action or reducer from the slice for logout button.
import { logout } from '../../store/authSlice'
//Also we need an authentication of logout from appwrite:-
import authService from '../../appwrite/auth'
import {useDispatch} from 'react-redux'



function Logout() {
//It dispatches an action calls to the reducer function.
    const dispatch = useDispatch();

//For logout button,Why not lets make an eventHandler callBack function
const LogoutHandler = ()=>{
    //authService is from appWrite so in the authService there is a logOut method and its a promise basically
    //So we know that how to resolve or reject a promise gracefully,Using '.then() and .catch()' method:-
    authService.logout()
    .then(()=>{
        dispatch(logout())
    })
    .catch((error)=>{
     console.error(error);   
    })
}
  return (
    <button
     className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
     onClick={LogoutHandler}
     >Logout
     </button>
  )
}

export default Logout