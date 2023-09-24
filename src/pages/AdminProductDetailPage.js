import React from 'react'
import { Navbar } from '../features/navbar/Navbar'
import AdminProductDetail from '../features/admin/components/AdminProductDetail'
import Footer from '../features/common/Footer'

const AdminProductDetailPage = () => {
  return (
    <>
      {' '}
      <Navbar>
        <AdminProductDetail />
      </Navbar>
      <Footer></Footer>
    </>
  )
}

export default AdminProductDetailPage
