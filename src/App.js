import React from 'react'
import logo from './logo.svg'
import './App.css'
import ProductList from './features/product-list/components/ProductList'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom'
import Cart from './features/cart/Cart'
import CartPage from './pages/CartPage'
import Checkout from './pages/Checkout'
import ProductDetail from './features/product-list/components/ProductDetail'
import ProductDetailPage from './pages/ProductDetailPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
  {
    path:'/product-detail',
    element:<ProductDetailPage/>  
  }
])
function App() {
  return <RouterProvider router={router} />
}

export default App
