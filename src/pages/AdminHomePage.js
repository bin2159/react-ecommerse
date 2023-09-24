import React from 'react'
import { Navbar } from '../features/navbar/Navbar'
import AdminProductList from '../features/admin/components/AdminProductList'
import Footer from '../features/common/Footer'

const AdminHomePage = () => {
  return (
    <>
     <Navbar>
        <AdminProductList/>
    </Navbar>
    <Footer></Footer>
    </>
   
  )
}

export default AdminHomePage