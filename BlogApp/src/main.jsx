import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {Provider} from 'react-redux';
import {store} from './store/store.js'
import { Route, RouterProvider,createBrowserRouter,createRoutesFromElements } from 'react-router-dom';
import Home from "./pages/Home";
import AuthLayout from './components/AuthLayout.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/Signup.jsx';
import AllPosts from './pages/AllPosts.jsx';
import AddPost from './pages/AddPost.jsx';
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx';


//Wraps the entire routing setup with a createBrowserRouter which creates a browser router instance, and creates routes from elements.
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
<Route path='/' element={<Home/>}/> 
<Route path= "/login" element={(

//AuthLayout is used to manage the authentication-related logic for certain routes.
  
  //These routes are accessible without authentication.
  <AuthLayout authentication={false}>
<Login/>
  </AuthLayout>
)}/> 
<Route path= "/signup" element={(
  //These routes are accessible without authentication.
  <AuthLayout authentication={false}>
<SignUp/>
  </AuthLayout>
)}/> 
<Route path= "/all-posts" element={(
  //These routes are accessible only if the user is authenticated.
  <AuthLayout authentication={true}>
<AllPosts/>
  </AuthLayout>
)}/> 
<Route path= "/add-post" element={(
  //These routes are accessible only if the user is authenticated.
  <AuthLayout authentication={true}>
<AddPost/>
  </AuthLayout>
)}/> 
<Route path= "/edit-post/:slug" element={(
  //These routes are accessible only if the user is authenticated.
  <AuthLayout authentication={true}>
<EditPost/>
  </AuthLayout>
)}/> 
<Route path= "/post/:slug" element={
<Post/>
}/> 
</Route>
));

//ReactDOM.createRoot is used to render the React application to the DOM root element:-
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
  <RouterProvider router={router}/>
  <App />
  </Provider>
  </React.StrictMode>,
)
