import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllOrdersAsync,
  selectAllOrders,
  selectTotalOrders,
  updateOrderAsync,
} from '../../order/orderSlice'
import { ORDERS_PER_PAGE, discountPercentage } from '../../../app/constant'
import { EyeIcon, PencilIcon } from '@heroicons/react/24/outline'
import Pagination from '../../common/Pagination'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid'

const AdminOrders = () => {
  const dispatch = useDispatch()
  const orders = useSelector(selectAllOrders)
  const totalOrders = useSelector(selectTotalOrders)
  const [page, setPage] = useState(1)
  const [editableOrderId, setEditableOrderId] = useState(null)
  const [sort, setSort] = useState({})
  const handleEdit = (order) => {
    setEditableOrderId(order.id)
  }
  const handleShow = (order) => {
    console.log(order)
  }
  const handleUpdateStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value }
    dispatch(updateOrderAsync(updatedOrder))
    setEditableOrderId(null)
  }

  const handleSort = (sortData) => {
    setSort({ ...sortData })
  }

  const chooseColor = (status) => {
    switch (status) {
      case 'pending':
        return `bg-purple-200 text-purple-600`
      case 'dispatched':
        return `bg-yellow-200 text-yellow-600`
      case 'delivered':
        return `bg-green-200 text-green-600`
      case 'cancelled':
        return `bg-red-200 text-red-600`
      default:
        return
    }
  }

  useEffect(() => {
    const pagination = { _page: page, _limit: ORDERS_PER_PAGE }
    dispatch(fetchAllOrdersAsync({ sort, pagination }))
  }, [dispatch, page, sort])

  return (
    <div className='overflow-x-auto'>
      <div className=' bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden'>
        <div className='w-full'>
          <div className='bg-white shadow-md rounded my-6'>
            <table className='min-w-max w-full table-auto'>
              <thead>
                <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                  <th
                    className='py-3 px-6 text-center'
                    onClick={(e) =>
                      handleSort({
                        _sort: 'id',
                        _order: sort._order === 'asc' ? 'desc' : 'asc',
                      })
                    }
                  >
                   
                      Order Number
                      {sort._sort==='id'&&sort._order === 'asc' ? (
                        <ArrowUpIcon className='w-4 h-4 inline' />
                      ) : (
                        <ArrowDownIcon className='w-4 h-4 inline' />
                      )}
                  </th>
                  <th className='py-3 px-6 text-center'>Items</th>
                  <th className='py-3 px-6 text-center'onClick={(e) =>
                      handleSort({
                        _sort: 'totalAmount',
                        _order: sort._order === 'asc' ? 'desc' : 'asc',
                      })
                    }
                  >
                   
                      Total Amount
                      {sort._sort==='totalAmount'&&sort._order === 'asc' ? (
                        <ArrowUpIcon className='w-4 h-4 inline' />
                      ) : (
                        <ArrowDownIcon className='w-4 h-4 inline' />
                      )}</th>
                  <th className='py-3 px-6 text-center'>Shipping Address</th>

                  <th className='py-3 px-6 text-center'>Status</th>
                  <th className='py-3 px-6 text-center'>Actions</th>
                </tr>
              </thead>
              <tbody className='text-gray-600 text-sm text-center font-light'>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className='border-b border-gray-200 hover:bg-gray-100'
                  >
                    <td className='py-3 px-6 whitespace-nowrap font-medium'>
                      #{order.id}
                    </td>
                    <td className=' py-3 px-6 whitespace-nowrap'>
                      {order.items.map((item) => (
                        <div
                          key={item.name}
                          className='flex items-center justify-center py-1'
                        >
                          <img
                            className='w-6 h-6 rounded-full'
                            src={item.thumbnail}
                            alt={item.title}
                          />
                          <span className='font-medium'>
                            {item.title} - (${discountPercentage(item)} x{' '}
                            {item.quantity})
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className='py-3 px-6 font-medium'>
                      ${order.totalAmount}
                    </td>
                    <td className='py-3 px-6'>
                      <div className='text-center '>
                        <span className='text-center font-medium'>
                          {order.selectedAddress.name}
                        </span>
                        <br />
                        {order.selectedAddress.street},<br />
                        {order.selectedAddress.city},<br />
                        {order.selectedAddress.pincode},<br />
                        {order.selectedAddress.state}
                      </div>
                    </td>
                    <td className='py-3 px-6 text-center'>
                      {order.id === editableOrderId ? (
                        <select onChange={(e) => handleUpdateStatus(e, order)}>
                          <option>--Select Status--</option>
                          <option value='pending'>Pending</option>
                          <option value='dispatched'>Dispatched</option>
                          <option value='delivered'>Delivered</option>
                          <option value='cancelled'>Cancel</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs font-medium`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className='py-3 px-6 text-center'>
                      <div className='flex item-center justify-center'>
                        <EyeIcon
                          className='w-6 mr-2 transform hover:text-purple-500 hover:scale-110'
                          onClick={(e) => handleShow(order)}
                        />
                        <PencilIcon
                          className='w-6 mr-2 transform hover:text-purple-500 hover:scale-110 '
                          onClick={(e) => handleEdit(order)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalItems={totalOrders}
        itemsPerPage={ORDERS_PER_PAGE}
      />
    </div>
  )
}
export default AdminOrders
