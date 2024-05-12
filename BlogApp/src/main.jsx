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

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
<Route path='/' element={<Home/>}/> 
<Route path= "/login" element={(
  <AuthLayout authentication={false}>
<Login/>
  </AuthLayout>
)}/> 
<Route path= "/signup" element={(
  <AuthLayout authentication={false}>
<SignUp/>
  </AuthLayout>
)}/> 
<Route path= "/all-posts" element={(
  <AuthLayout authentication={true}>
<AllPosts/>
  </AuthLayout>
)}/> 
<Route path= "/add-post" element={(
  <AuthLayout authentication={true}>
<AddPost/>
  </AuthLayout>
)}/> 
<Route path= "/edit-post/:slug" element={(
  <AuthLayout authentication={true}>
<EditPost/>
  </AuthLayout>
)}/> 
<Route path= "/post/:slug" element={
<Post/>
}/> 
</Route>
));
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
  <RouterProvider router={router}/>
  <App />
  </Provider>
  </React.StrictMode>,
)
