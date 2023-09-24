import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  deleteItemAsync,
  selectCartListStatus,
  selectItem,
  updateItemAsync,
} from './cartSlice'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, Navigate } from 'react-router-dom'
import { updateItem } from './cartAPI'
import { discountPercentage } from '../../app/constant'
import { Grid } from 'react-loader-spinner'
import Modal from '../common/Modal'

export default function Cart() {
  const items = useSelector(selectItem)
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(null)
  const status = useSelector(selectCartListStatus)
  const totalAmount = items.reduce(
    (amount, item) => amount + discountPercentage(item.product) * item.quantity,
    0
  )
  const totalItem = items.reduce((total, item) => total + item.quantity, 0)
  const handleQuantity = (e, item) => {
    dispatch(updateItemAsync({ id: item.id, quantity: +e.target.value }))
  }
  const handleRemove = (id) => {
    dispatch(deleteItemAsync(id))
  }
  return (
    <>
      {!items.length && <Navigate to='/' replace={true} />}

      <div className='mx-auto mt-10 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-white'>
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 py-2 px-4'>
          Cart
        </h1>
        <div className='border-t border-gray-200  py-6 sm:px-6'>
          <div className='flow-root'>
            {status === 'loading' && (
              <div className='h-screen flex items-center justify-center'>
                <Grid
                  height='80'
                  width='80'
                  color='rgb(79, 70, 229'
                  ariaLabel='grid-loading'
                  radius='12.5'
                  wrapperStyle={{}}
                  wrapperClass=''
                  visible={true}
                />
              </div>
            )}
            <ul r className='-my-6 divide-y divide-gray-200'>
              {items.map((item) => (
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
                        <h3>{item.product.title}</h3>
                        <p className='ml-4'>
                          ${discountPercentage(item.product)}
                        </p>
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
                          Qty
                        </label>
                        <select onChange={(e) => handleQuantity(e, item)}>
                          <option value='1'>1</option>
                          <option value='2'>2</option>
                          <option value='3'>3</option>
                          <option value='4'>4</option>
                          <option value='5'>5</option>
                          <option value='6'>6</option>
                        </select>
                      </div>

                      <div className='flex'>
                        <Modal
                          title='Delete Cart Item'
                          message='Are you sure you want to delete'
                          action='Delete'
                          cancel='Cancel'
                          actionHandler={()=>handleRemove(item.id)}
                          cancelHandler={()=>setOpenModal(null)}
                          showModal={openModal===item.id}
                        />
                        <button
                          onClick={()=>setOpenModal(item.id)}
                          type='button'
                          className='font-medium text-indigo-600 hover:text-indigo-500'
                        >
                          Remove
                        </button>
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
            <p>$ {totalAmount}</p>
          </div>
          <div className='flex justify-between text-base my-2 font-medium text-gray-900'>
            <p>Total Items in cart</p>
            <p>{totalItem} items</p>
          </div>
          <p className='mt-0.5 text-sm text-gray-500'>
            Shipping and taxes calculated at checkout.
          </p>
          <div className='mt-6'>
            <Link
              to='/checkout'
              className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
            >
              Checkout
            </Link>
          </div>
          <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
            <p>
              or
              <Link to='/'>
                <button
                  type='button'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Continue Shopping
                  <span aria-hidden='true'> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
