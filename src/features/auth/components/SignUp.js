import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { Link, Navigate } from 'react-router-dom'
import logo from '../../../assets/businesslogo.png'
import {
  createUserAsync,
  selectError,
  selectloggedInUser,
} from '../authSlice'

export default function SignUp() {
  const dispatch = useDispatch()
  const error = useSelector(selectError)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const user = useSelector(selectloggedInUser)
 
  return (
    <>
      {user && <Navigate to='/' replace={true} />}
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto h-12 w-12 mt-4'
            src={logo}
            alt='Your Company'
          />
          <h2 className='mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Create Account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            noValidate
            className='space-y-6'
            onSubmit={handleSubmit((data) =>
              dispatch(
                createUserAsync({
                  email: data.email,
                  password: data.password,
                  addresses: [],
                  role: 'user',
                })
              )
            )}
          >
            <div>
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
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: 'Email Not Valid',
                    },
                  })}
                  type='email'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
                {errors.email && (
                  <p className='text-red-500'>{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>

                <div className='text-sm'></div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  {...register('password', {
                    required: 'Password is required',
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gi,
                      message: `- at least 8 characters \n
                    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number \n
                    - Can contain special characters`,
                    },
                  })}
                  type='password'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
                {errors.password && (
                  <p className='text-red-500'>{errors.password.message}</p>
                )}
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='confirm-password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Confirm Password
                </label>
              </div>
              <div className='mt-2'>
                <input
                  id='confirm-password'
                  name='confirm-password'
                  {...register('confirmPassword', {
                    required: 'Confirm Password is required',
                    validate: (value, formValues) =>
                      value === formValues.password || 'Password Not Matching',
                  })}
                  type='password'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
                {errors.confirmPassword && (
                  <p className='text-red-500'>
                    {errors.confirmPassword.message}
                  </p>
                )}
                {error && <p className='text-red-500'>{error.message}</p>}
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Already a Member?{' '}
            <Link
              to='/login'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
