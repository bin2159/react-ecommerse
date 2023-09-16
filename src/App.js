import React, { useEffect } from 'react'
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
import Protected from './features/auth/components/Protected'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartByUserIdAsync } from './features/cart/cartSlice'
import { selectloggedInUser } from './features/auth/authSlice'
import PageNotFound from './pages/404'
import OrderSuccessPage from './pages/OrderSuccessPage'
import UserOrders from './features/user/components/UserOrders'
import UserOrderPage from './pages/UserOrderPage'
import UserProfile from './features/user/components/UserProfile'
import UserProfilePage from './pages/UserProfilePage'
import { fetchLoggedInUserAsync } from './features/user/userSlice'
import LogOut from './features/auth/components/LogOut'
import ForgotPassword from './features/auth/components/ForgotPassword'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ProtectedAdmin from './features/auth/components/ProtectedAdmin'
import AdminHomePage from './pages/AdminHomePage'
import AdminProductDetailPage from './pages/AdminProductDetailPage'
import ProductForm from './features/admin/components/ProductForm'
import AdminProductFormPage from './pages/AdminProductFormPage'
import AdminOrdersPage from './pages/AdminOrdersPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
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
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/cart',
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: '/checkout',
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: '/product-detail/:id',
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHomePage />
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-detail/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: '/order-success/:id',
    element: (
      <Protected>
        <OrderSuccessPage />
      </Protected>
    ),
  },
  {
    path: '/orders',
    element: (
      <Protected>
        <UserOrderPage />
      </Protected>
    ),
  },
  {
    path: '/profile',
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },
  { path: '/logOut', element: <LogOut /> },
  {
    path: '*',
    element: <PageNotFound />,
  },
])
function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectloggedInUser)
  useEffect(() => {
    if (user) {
      dispatch(fetchCartByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user])
  return <RouterProvider router={router} />
}

export default App
