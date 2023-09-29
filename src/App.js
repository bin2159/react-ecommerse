import React, { useEffect } from 'react'
import { Provider, positions } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { useDispatch, useSelector } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import {
  checkAuthAsync,
  selectUserChecked,
  selectloggedInUser,
} from './features/auth/authSlice'
import LogOut from './features/auth/components/LogOut'
import Protected from './features/auth/components/Protected'
import ProtectedAdmin from './features/auth/components/ProtectedAdmin'
import { fetchCartByUserIdAsync } from './features/cart/cartSlice'
import { fetchLoggedInUserAsync } from './features/user/userSlice'
import PageNotFound from './pages/404'
import AdminHomePage from './pages/AdminHomePage'
import AdminOrdersPage from './pages/AdminOrdersPage'
import AdminProductDetailPage from './pages/AdminProductDetailPage'
import AdminProductFormPage from './pages/AdminProductFormPage'
import CartPage from './pages/CartPage'
import Checkout from './pages/Checkout'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import ProductDetailPage from './pages/ProductDetailPage'
import SignUpPage from './pages/SignUpPage'
import UserOrderPage from './pages/UserOrderPage'
import UserProfilePage from './pages/UserProfilePage'
const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
}
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
  const userChecked = useSelector(selectUserChecked)
  useEffect(() => {
    dispatch(checkAuthAsync())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(fetchCartByUserIdAsync())
      dispatch(fetchLoggedInUserAsync())
    }
  }, [dispatch, user])
  return (
    <div>
      {userChecked && (
        <Provider template={AlertTemplate} {...options}>
          <RouterProvider router={router} />
        </Provider>
      )}
    </div>
  )
}

export default App
