import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo, updateUserAsync } from '../userSlice'

export default function UserProfile() {
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm()
  const userInfo = useSelector(selectUserInfo)
  const dispatch = useDispatch()
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1)
  const [showAddAddressForm, setShowAddressForm] = useState(false)
  const handleEdit = (updateAddress, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }
    newUser.addresses.splice(index, 1, updateAddress)
    dispatch(updateUserAsync(newUser))
    setSelectedEditIndex(-1)
  }
  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }
    newUser.addresses.splice(index, 1)
    dispatch(updateUserAsync(newUser))
  }
  const handleEditForm = (index, address) => {
    setValue('name', address.name)
    setValue('email', address.email)
    setValue('phone', address.phone)
    setValue('street', address.street)
    setValue('city', address.city)
    setValue('state', address.state)
    setValue('pincode', address.pincode)

    setSelectedEditIndex(index)
  }
  const handleAddAddress = () => {
    setShowAddressForm(true)
  }
  const handleAdd = (address) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses, address] }
    dispatch(updateUserAsync(newUser))
    setShowAddressForm(false)
  }
  return (
    <div>
      <div className='mx-auto mt-10 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-white'>
        <div className='border-b-2 pb-2'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 py-2 '>
            Name: {userInfo.name ? userInfo.name : 'New User'}
          </h1>
          <h3 className='text-2xl font-bold tracking-tight text-red-900 pb-2  '>
            Email Address: {userInfo.email}
          </h3>
          {userInfo.role === 'admin' && (
            <h3 className='text-2xl font-bold tracking-tight text-red-900 pb-2'>
              Role: {userInfo.role}
            </h3>
          )}
        </div>
        <button
          onClick={(e) => handleAddAddress()}
          type='submit'
          className='rounded-md bg-green-600 px-3 py-2 my-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Add Address
        </button>
        {showAddAddressForm && (
          <form
            className='bg-white px-5 mt-10 py-5 mb-10'
            noValidate
            onSubmit={handleSubmit((data) => handleAdd(data))}
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
                onClick={(e) => setSelectedEditIndex(-1)}
                type='submit'
                className='rounded-md bg-grey-600 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-grey-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Add Address
              </button>
            </div>
          </form>
        )}
        <p className='mt-0.5 text-sm text-gray-500'>Your Addresses:</p>
        {userInfo.addresses.map((address, index) => (
          <div key={index}>
            {selectedEditIndex === index ? (
              <form
                className='bg-white px-5 mt-10 py-5 mb-10'
                noValidate
                onSubmit={handleSubmit((data) => handleEdit(data, index))}
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
                          {...register('name', {
                            required: 'Name is required',
                          })}
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
                          {...register('city', {
                            required: 'City is required',
                          })}
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
                    onClick={(e) => setSelectedEditIndex(-1)}
                    type='submit'
                    className='rounded-md bg-grey-600 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-grey-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  >
                    Edit Address
                  </button>
                </div>
              </form>
            ) : null}
            <div
              key={address.pincode}
              className='flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 px-5'
            >
              <div className='flex min-w-0 gap-x-4'>
                {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
                <div className='min-w-0 flex-auto'>
                  <p className='text-sm font-semibold leading-6 text-gray-900'>
                    {address.name}
                  </p>
                  <p className='mt-1 truncate text-sm leading-5 text-gray-500'>
                    {address.street}
                  </p>
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
              <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                <button
                  onClick={() => handleEditForm(index, address)}
                  type='button'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handleRemove(e, index)}
                  type='button'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
