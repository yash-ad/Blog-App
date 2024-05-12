import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {Provider} from 'react-redux';
import {store} from './store/store.js'
import { Route, RouterProvider,createBrowserRouter,createRoutesFromElements } from 'react-router-dom';
import Home from "./pages/Home"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
<Route path='/' element={<Home/>}/> 
<Route path= "" element={}/> 
<Route path='' element={}/> 
<Route path='' element={}/> 
<Route path='' element={}/> 
  </Route>
))
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
  <RouterProvider router={router}/>
  <App />
  </Provider>
  </React.StrictMode>,
)
