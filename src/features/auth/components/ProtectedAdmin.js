import React from 'react'
import { useSelector } from 'react-redux'
import { selectloggedInUser } from '../authSlice'
import { Navigate } from 'react-router-dom'
import { selectUserInfo } from '../../user/userSlice'

const ProtectedAdmin = ({children}) => {
  const user=useSelector(selectloggedInUser)
  const userInfo=useSelector(selectUserInfo)
    if(!user){  
        return <Navigate to='/login' replace={true}/>
    }
    if(user&&userInfo.role!=='admin'){
        return <Navigate to='/' replace={true}/>
    }
  return children
}

export default ProtectedAdmin