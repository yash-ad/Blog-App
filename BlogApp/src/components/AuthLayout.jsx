import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';


function AuthLayout({children,
  authentication=true}) {

  const [loading,setLoading] = useState(true);

  const navigate = useNavigate();

 //User current status the user is logged in or not
 //UseSelector subscribes to the store and it has access of current state.
  const authStatus = useSelector((state)=> state.auth.status)
  

  //useEffect for side-effects in a functional component and useEffect also used for data fetching, subscribing and manipulating the dom
  //Within the useEffect it  accepts two arguments the first is sideeffects in a callback function,the second is an optional dependency array
  //But here we are accepting a dependency array with a conditions 1.authStatus 2.navigate 3.authentication
    //useEffect will run after render the component initially and re-render the component when there is something changes in to the dependency arrays condition.
    useEffect(()=>{
      // By default value of an authentication is True
      // And the current state of an authStatus is false
      // so overhere true && false !== true -> so true && true
      // the condition is true then navigate login to the user
if(authentication && authStatus !== authentication){
navigate('/login')
}
//So overhere now the authStatus current state is true, because of an earlier expression
//authentication by default its true
// So here the !true which means false 
// false && true !== true
//false && false
//The condition would be false overhere
//
else if(!authentication && authStatus !== authentication){
navigate('/');
}
      setLoading(false)
    },[authStatus,navigate,authentication])

  return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthLayout