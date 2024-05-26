import React from 'react'; // Importing React library
import ReactDOM from 'react-dom/client'; // Importing ReactDOM for rendering
import App from './App.jsx'; // Importing the root App component
import './index.css'; // Importing global CSS styles
import { Provider } from 'react-redux'; // Importing Provider component from react-redux for Redux store integration
import store from './store/store.js'; // Importing Redux store
import { RouterProvider, createBrowserRouter } from 'react-router-dom'; // Importing RouterProvider and createBrowserRouter from react-router-dom
import Home from './pages/Home.jsx'; // Importing Home component
import { AuthLayout, Login } from './components/index.js'; // Importing AuthLayout and Login components
import AllPosts from './pages/AllPosts.jsx'; // Importing AllPosts component
import AddPost from './pages/AddPost.jsx'; // Importing AddPost component
import EditPost from './pages/EditPost.jsx'; // Importing EditPost component
import Post from './pages/Post.jsx'; // Importing Post component
import Signup from './pages/Signup.jsx'; // Importing Signup component

// Creating the router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Root element is the App component
    children: [
      {
        path: '/',
        element: <Home />, // Render Home component for the root path
      },
      {
        path: '/login',
        element: ( // Render Login component wrapped with AuthLayout for non-authenticated users
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: ( // Render Signup component wrapped with AuthLayout for non-authenticated users
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: '/all-posts',
        element: ( // Render AllPosts component wrapped with AuthLayout for authenticated users
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: '/add-post',
        element: ( // Render AddPost component wrapped with AuthLayout for authenticated users
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: '/edit-post/:slug',
        element: ( // Render EditPost component wrapped with AuthLayout for authenticated users
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />, // Render Post component for dynamic post URLs
      },
    ],
  },
]);

// Rendering the app with Redux store and router configuration
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Providing the Redux store to the entire app */}
      <RouterProvider router={router} /> {/* Providing the router configuration to the entire app */}
    </Provider>
  </React.StrictMode>,
);
