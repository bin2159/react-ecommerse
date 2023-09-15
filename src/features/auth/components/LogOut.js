import React, { useEffect } from 'react'
import { selectloggedInUser, signOutAsync } from '../authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Home from '../../../pages/Home'

const LogOut = () => {
  const user = useSelector(selectloggedInUser)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(signOutAsync(user.id))
  }, [dispatch])
  return (
    <>{!user&& <Navigate to={'/login'} replace={true}></Navigate>}</>
  )
}

export default LogOut
