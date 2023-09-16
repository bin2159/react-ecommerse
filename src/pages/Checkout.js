import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import {
  deleteItemAsync,
  increment,
  incrementAsync,
  selectItem,
  updateItemAsync,
} from '../features/cart/cartSlice'
import { useForm } from 'react-hook-form'
import { selectloggedInUser} from '../features/auth/authSlice'
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice'
import { selectUserInfo, updateUserAsync } from '../features/user/userSlice'
import { discountPercentage } from '../app/constant'


const Checkout = () => {
  const items = useSelector(selectItem)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(true)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const user = useSelector(selectUserInfo)
  const currentOrder=useSelector(selectCurrentOrder)
  const [selectedAddress,setSelectedAddress]=useState(null)
  const [paymentMethod,setPaymentMethod]=useState('cash')
  const totalAmount = items.reduce(
    (amount, item) => amount + discountPercentage(item) * item.quantity,
    0
  )
  const totalItem = items.reduce((total, item) => total + item.quantity, 0)
  const handleQuantity = (e, item) => {
    dispatch(updateItemAsync({ ...item, quantity: +e.target.value }))
  }
  const handleRemove = (e, id) => {
    dispatch(deleteItemAsync(id))
  }
  const handleAddress=(e,address)=>{
    setSelectedAddress(address)
  }
  const handlePayment=(e)=>{
    setPaymentMethod(e.target.value)
  }
  const handleOrder=()=>{
    console.log(selectedAddress)
    const order={items,totalAmount,totalItem,user,paymentMethod,selectedAddress,status:'pending'}
    dispatch(createOrderAsync(order))
  }
  return (
    <>
      {!items.length && <Navigate to='/' />}
      {currentOrder&&<Navigate to={`/order-success/${currentOrder.id}`} replace={true}/>}
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5'>
          <div className='lg:col-span-3'>
            <form
              className='bg-white px-5 mt-10 py-5 mb-10'
              noValidate
              onSubmit={handleSubmit((data) =>
              {  dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, data],
                  })
                )
              reset()}
              )}
            >
              <div className='border-b border-gray-900/10 pb-12 '>
                <h2 className='text-2xl font-semibold leading-7 text-gray-900'>
                  Personal Information
                </h2>
                <p className='mt-1 text-sm leading-6 text-gray-600'>
                  Use a permanent address where you can receive mail.
                </p>

                <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                  <div className='sm:col-span-4'>
                    <label
                      htmlFor='first-name'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Full Name
                    </label>
                    <div className='mt-2'>
                      <input
                        type='text'
                        name='name'
                        id='name'
                        {...register('name', { required: 'Name is required' })}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-4'>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Email address
                    </label>
                    <div className='mt-2'>
                      <input
                        id='email'
                        name='email'
                        {...register('email', {
                          required: 'Email is required',
                        })}
                        type='email'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='country'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Phone
                    </label>
                    <div className='mt-2'>
                      <input
                        id='phone'
                        name='phone'
                        {...register('phone', {
                          required: 'phone is required',
                        })}
                        type='tel'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='col-span-full'>
                    <label
                      htmlFor='street-address'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Street address
                    </label>
                    <div className='mt-2'>
                      <input
                        type='text'
                        name='street-address'
                        id='street'
                        {...register('street', {
                          required: 'Street is required',
                        })}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-2 sm:col-start-1'>
                    <label
                      htmlFor='city'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      City
                    </label>
                    <div className='mt-2'>
                      <input
                        type='text'
                        name='city'
                        id='city'
                        {...register('city', { required: 'City is required' })}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='region'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      State / Province
                    </label>
                    <div className='mt-2'>
                      <input
                        type='text'
                        name='region'
                        id='region'
                        {...register('state', {
                          required: 'State is required',
                        })}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='postal-code'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      ZIP / Postal code
                    </label>
                    <div className='mt-2'>
                      <input
                        type='text'
                        name='pin-code'
                        id='pin-code'
                        {...register('pincode', {
                          required: 'Pin-Code is required',
                        })}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-6 flex items-center justify-end gap-x-6'>
                <button
                  type='button'
                  className='text-sm font-semibold leading-6 text-gray-900'
                  onClick={()=>{reset()}}
                >
                  Reset
                </button>
                <button
                  type='submit'
                  className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Add Address
                </button>
              </div>

              <div className='border-b border-gray-900/10 pb-12'>
                <h2 className='text-base font-semibold leading-7 text-gray-900'>
                  Address
                </h2>
                <p className='mt-1 text-sm leading-6 text-gray-600'>
                  Choose From Existing Address
                </p>
                <ul role='list'>
                  {user.addresses.length > 0 &&
                    user.addresses.map((address,index) => (
                      <li
                        key={index}
                        className='flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 px-5'
                      >
                        <div className='flex min-w-0 gap-x-4'>
                          <input
                            onChange={(e)=> handleAddress(e,address)}
                            name='address'
                            type='radio'
                            value={index}
                            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                          />
                          {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
                          <div className='min-w-0 flex-auto'>
                            <p className='text-sm font-semibold leading-6 text-gray-900'>
                              {address.name}
                            </p>
                            <p className='mt-1 truncate text-sm leading-5 text-gray-500'>
                              {address.street}
                            </p>{' '}
                            <p className='text-sm leading-6 text-gray-500'>
                              {address.pincode}
                            </p>
                          </div>
                        </div>
                        <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                          <p className='text-sm leading-6 text-gray-900'>
                            Phone: {address.phone}
                          </p>
                          <p className='text-sm leading-6 text-gray-900'>
                            {address.city}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
                <div className='mt-10 space-y-10'>
                  <fieldset>
                    <legend className='text-sm font-semibold leading-6 text-gray-900'>
                      Payment Method
                    </legend>
                    <p className='mt-1 text-sm leading-6 text-gray-600'>
                      Choose One
                    </p>
                    <div className='mt-6 space-y-6'>
                      <div className='flex items-center gap-x-3'>
                        <input
                          id='cash'
                          onChange={(e)=>handlePayment(e)}
                          value='cash'
                          name='payment'
                          type='radio'
                          checked={paymentMethod==='cash'}
                          className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                        />
                        <label
                          htmlFor='cash'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Cash
                        </label>
                      </div>
                      <div className='flex items-center gap-x-3'>
                        <input
                          id='card'
                          onChange={(e)=>handlePayment(e)}
                          value='card'
                          checked={paymentMethod==='card'}
                          name='payment'
                          type='radio'
                          className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                        />
                        <label
                          htmlFor='card'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Card Payment
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
          <div className='lg:col-span-2'>
            <div className='mx-auto mt-10 max-w-7xl px-1 py-6 sm:px-1 lg:px-1 bg-white'>
              <h1 className='text-4xl font-bold tracking-tight text-gray-900 py-2 px-4 '>
                Cart
              </h1>
              <div className='border-t border-gray-200  py-6 sm:px-6'>
                <div className='flow-root'>
                  <ul role='list' className='-my-6 divide-y divide-gray-200'>
                    {items.map((product) => (
                      <li key={product.id} className='flex py-6'>
                        <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className='h-full w-full object-cover object-center'
                          />
                        </div>

                        <div className='ml-4 flex flex-1 flex-col'>
                          <div>
                            <div className='flex justify-between text-base font-medium text-gray-900'>
                              <h3>
                                <a href={product.href}>{product.title}</a>
                              </h3>
                              <p className='ml-4'>${discountPercentage(product)}</p>
                            </div>
                            <p className='mt-1 text-sm text-gray-500'>
                              {product.brand}
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
                              <select
                                onChange={(e) => handleQuantity(e, product)}
                              >
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                              </select>
                            </div>

                            <div className='flex'>
                              <button
                                onClick={(e) => handleRemove(e, product.id)}
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
                  <div
                    onClick={handleOrder}
                    className='flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                  >
                    Order Now
                  </div>
                </div>
                <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                  <p>
                    or
                    <Link to='/'>
                      <button
                        type='button'
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                        onClick={() => setOpen(false)}
                      >
                        Continue Shopping
                        <span aria-hidden='true'> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
