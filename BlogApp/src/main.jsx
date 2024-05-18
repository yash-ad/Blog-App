// Import necessary modules from React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main App component and CSS file
import App from './App.jsx';
import './index.css';

// Import Provider from react-redux for Redux store integration
import { Provider } from 'react-redux';
import store from './store/store.js';

// Import necessary modules from react-router-dom for routing
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Import various components and pages
import Home from './pages/Home.jsx';
import { AuthLayout, Login } from './components/index.js';
import AddPost from "./pages/AddPost";
import Signup from './pages/Signup';
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";

// Create a browser router with specified routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />, // Home page component
        },
        {
            path: "/login",
            element: ( // Login page wrapped with AuthLayout for authentication
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: ( // Signup page wrapped with AuthLayout for authentication
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: ( // AllPosts page wrapped with AuthLayout for authentication
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: ( // AddPost page wrapped with AuthLayout for authentication
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: ( // EditPost page wrapped with AuthLayout for authentication
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />, // Post page component
        },
    ],
},
]);

// Render the application with Redux store provider and router provider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
