import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductList from './features/product-list/ProductList';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/signup",
    element: <SignUpPage/>,
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
