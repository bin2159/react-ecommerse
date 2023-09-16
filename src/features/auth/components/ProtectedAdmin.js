import React from 'react'
import { useSelector } from 'react-redux'
import { selectloggedInUser } from '../authSlice'
import { Navigate } from 'react-router-dom'

const ProtectedAdmin = ({children}) => {
  const user=useSelector(selectloggedInUser)
  
    if(!user){  
        return <Navigate to='/login' replace={true}/>
    }
    if(user&&user.role!=='admin'){
        return <Navigate to='/' replace={true}/>
    }
  return children
}

export default ProtectedAdmin