import React from 'react'; // Importing React library
import ReactDOM from 'react-dom/client'; // Importing ReactDOM for rendering
import App from './App.jsx'; // Importing the root App component
import './index.css'; // Importing global CSS styles
import { Provider } from 'react-redux'; // Importing Provider component from react-redux for Redux store integration
import store from './store/store.js'; // Importing Redux store
import { RouterProvider, createBrowserRouter } from 'react-router-dom'; // Importing RouterProvider and createBrowserRouter from react-router-dom
import { AuthLayout } from './components/index.js'; // Importing AuthLayout and Login components
import { lazy } from 'react';


//Lazy load to route the components:-
const Home = lazy(()=> import('./pages/Home.jsx'));
const Login = lazy(()=> import('./pages/Login.jsx'));
const Signup = lazy(()=> import('./pages/Signup.jsx'));
const AllPosts = lazy(() => import('./pages/AllPosts.jsx'));
const AddPost = lazy(() => import('./pages/AddPost.jsx'));
const EditPost = lazy(() => import('./pages/EditPost.jsx'));
const Post = lazy(() => import('./pages/Post.jsx'));

// Creating the router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Root element is the App component
    // Child routes are defined within the children array and it directly links and render to the <Outlet/>:-
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
