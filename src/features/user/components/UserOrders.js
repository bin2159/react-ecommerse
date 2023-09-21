import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectloggedInUser } from '../../auth/authSlice'
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrder } from '../userSlice'
import { Link } from 'react-router-dom'
import { discountPercentage } from '../../../app/constant'

export default function UserOrders() {
  const userInfo = useSelector(selectUserInfo)
  const dispatch = useDispatch()
  const orders = useSelector(selectUserOrder)
  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(userInfo.id))
  }, [dispatch, userInfo])
  return (
    <div>
      <div>
        {orders.map((order) => (
          <div key={order.id}>
            <div className='mx-auto mt-10 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-white'>
              <h1 className='text-4xl font-bold tracking-tight text-gray-900 py-2 px-4'>
                Order Id: #{order.id}
              </h1>
              <h3 className='text-2xl font-bold tracking-tight text-red-900 py-2 px-4'>
                Order Status : {order.status}
              </h3>
              <div className='border-t border-gray-200  py-6 sm:px-6'>
                <div className='flow-root'>
                  <ul role='list' className='-my-6 divide-y divide-gray-200'>
                    {order.items.map((item) => (
                      <li key={item.id} className='flex py-6'>
                        <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className='h-full w-full object-cover object-center'
                          />
                        </div>

                        <div className='ml-4 flex flex-1 flex-col'>
                          <div>
                            <div className='flex justify-between text-base font-medium text-gray-900'>
                              <h3>
                                <a href={item.id}>{item.product.title}</a>
                              </h3>
                              <p className='ml-4'>${discountPercentage(item.product)}</p>
                            </div>
                            <p className='mt-1 text-sm text-gray-500'>
                              {item.product.brand}
                            </p>
                          </div>
                          <div className='flex flex-1 items-end justify-between text-sm'>
                            <div className='text-gray-500'>
                              <label
                                htmlFor='quantity'
                                className='inline mr-5 text-sm font-medium leading-6 text-gray-900'
                              >
                                Qty:{item.quantity}
                              </label>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                <div className='flex justify-between text-base my-2 font-medium text-gray-900'>
                  <p>Subtotal</p>
                  <p>$ {order.totalAmount}</p>
                </div>
                <div className='flex justify-between text-base my-2 font-medium text-gray-900'>
                  <p>Total Items in cart</p>
                  <p>{order.totalItem} items</p>
                </div>
                <p className='mt-0.5 text-sm text-gray-500'>
                  Shipping Address
                </p>
                <div
                  className='flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 px-5'
                >
                  <div className='flex min-w-0 gap-x-4'>
                    
                    {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
                    <div className='min-w-0 flex-auto'>
                      <p className='text-sm font-semibold leading-6 text-gray-900'>
                        {order.selectedAddress.name}
                      </p>
                      <p className='mt-1 truncate text-sm leading-5 text-gray-500'>
                        {order.selectedAddress.street}
                      </p>{' '}
                      <p className='text-sm leading-6 text-gray-500'>
                        {order.selectedAddress.pincode}
                      </p>
                    </div>
                  </div>
                  <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                    <p className='text-sm leading-6 text-gray-900'>
                      Phone: {order.selectedAddress.phone}
                    </p>
                    <p className='text-sm leading-6 text-gray-900'>
                      {order.selectedAddress.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
