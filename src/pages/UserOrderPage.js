import React from 'react'
import { Navbar } from '../features/navbar/Navbar'
import UserOrders from '../features/user/components/UserOrders'

const UserOrderPage = () => {
  return (
    <Navbar>
      <h1 className='mx-auto text-2xl'>My Order</h1>
      <UserOrders />
    </Navbar>
  )
}

export default UserOrderPage
