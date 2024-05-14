import React from 'react';
import ReactDOM from 'react-dom/client'; // Importing ReactDOM for rendering
import App from './App.jsx'; // Importing the main App component
import './index.css'; // Importing CSS styles
import { Provider } from 'react-redux'; // Importing Provider for Redux
import { store } from './store/store.js'; // Importing Redux store
import { RouterProvider, createBrowserRouter } from 'react-router-dom'; // Importing router utilities
import Home from "./pages/Home"; // Importing the Home component
import AuthLayout from './components/AuthLayout.jsx'; // Importing the AuthLayout component
import Login from './pages/Login.jsx'; // Importing the Login component
import SignUp from './pages/Signup.jsx'; // Importing the Signup component
import AllPosts from './pages/AllPosts.jsx'; // Importing the AllPosts component
import AddPost from './pages/AddPost.jsx'; // Importing the AddPost component
import EditPost from './pages/EditPost.jsx'; // Importing the EditPost component
import Post from './pages/Post.jsx'; // Importing the Post component

// Creating a router using createBrowserRouter
const router = createBrowserRouter(
  [
    {
      // Root route configuration
      path: "/", // Path of the root route
      element: <App />, // Main App component as the root element
      children: [
        // Nested routes configuration
        {
          path: "/", // Path for the home page
          element: <Home />, // Home component as the element
        },
        {
          path: "/login", // Path for the login page
          element: (
            // AuthLayout wrapping the Login component with authentication set to false
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          ),
        },
        {
          path: "/signup", // Path for the signup page
          element: (
            // AuthLayout wrapping the SignUp component with authentication set to false
            <AuthLayout authentication={false}>
              <SignUp />
            </AuthLayout>
          ),
        },
        {
          path: "/all-posts", // Path for the all-posts page
          element: (
            // AuthLayout wrapping the AllPosts component with authentication set to true
            <AuthLayout authentication={true}>
              <AllPosts />
            </AuthLayout>
          ),
        },
        {
          path: "/add-post", // Path for the add-post page
          element: (
            // AuthLayout wrapping the AddPost component with authentication set to true
            <AuthLayout authentication={true}>
              <AddPost />
            </AuthLayout>
          ),
        },
        {
          path: "/edit-post/:slug", // Path for the edit-post page with a dynamic slug parameter
          element: (
            // AuthLayout wrapping the EditPost component with authentication set to true
            <AuthLayout authentication={true}>
              <EditPost />
            </AuthLayout>
          ),
        },
        {
          path: "/post/:slug", // Path for the post page with a dynamic slug parameter
          element: <Post />, // Post component as the element
        },
      ],
    },
  ]
);

// Rendering the root React element using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrapping the entire app with Redux Provider */}
    <Provider store={store}>
      {/* Providing the router to the app */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
