import  { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth.js";


function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

useEffect(() => {
	authService.getCurrentUser().then((userData)=>{
if(userData){
	dispatch(login({userData}))
}else{
	dispatch(logout())
}
})
.finally(()=> setLoading(false))
}, [])
  
	return !loading ? (
		<>
			<Header />

			<main className="min-h-screen py-6">
				<Outlet />
			</main>

			<Footer />
		</>
	) : null;
}

export default App;