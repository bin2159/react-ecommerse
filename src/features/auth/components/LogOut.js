import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectloggedInUser, signOutAsync } from '../authSlice'

const LogOut = () => {
  const user = useSelector(selectloggedInUser)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(signOutAsync())
  }, [dispatch])
  return <>{!user && <Navigate to={'/login'} replace={true}></Navigate>}</>
}

export default LogOut
