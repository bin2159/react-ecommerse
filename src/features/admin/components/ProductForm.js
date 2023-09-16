import React, { useEffect } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux'
import { clearSelectedProduct, createProductAsync, fetchProductByIdAsync, selectBrands, selectCategories, selectProductById, updateProductAsync } from '../../product-list/productSlice'
import { useForm } from 'react-hook-form'
import { checkUserAsync, selectError } from '../../auth/authSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProductById } from '../../product-list/productAPI'

const ProductForm = () => {
  const brands = useSelector(selectBrands)
  const categories = useSelector(selectCategories)
  const selectedProduct=useSelector(selectProductById)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const params=useParams()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  const handleDelete=()=>{
    let user_input=window.confirm('Click ok to delete the product')
    if(user_input){
      const product={...selectedProduct}
    product.delete=true
    dispatch(updateProductAsync(product))  
    }
    
  }

  useEffect(()=>{
    if(params.id){
        dispatch(fetchProductByIdAsync(params.id))
    }

  },[dispatch,params.id])
  useEffect(()=>{
    if(selectedProduct){
        setValue('title', selectedProduct.title)
    setValue('description', selectedProduct.description)
    setValue('price', selectedProduct.price)
    setValue('brand', selectedProduct.brand)
    setValue('category', selectedProduct.category)
    setValue('stock', selectedProduct.stock)
    setValue('discountPercentage', selectedProduct.discountPercentage)
    setValue('thumbnail', selectedProduct.thumbnail)
    setValue('image1', selectedProduct.images[0])
    setValue('image2', selectedProduct.images[1])
    setValue('image3', selectedProduct.images[2])
    }
    
  },[setValue,selectedProduct]) 
  return (
    <form noValidate onSubmit={handleSubmit((data)=>{
        const product={...data}
        product.images=[product.image1,product.image2,product.image3]
        delete product['image1']
        delete product['image2']
        delete product['image3']
        product.price=+product.price
        product.stock=+product.stock
        product.rating=0
        product.discountPercentage=+product.discountPercentage
        console.log(product)
        if(params.id){
            product.id=params.id
            product.rating=selectedProduct.rating||0
           dispatch(updateProductAsync(product)) 
           dispatch(clearSelectedProduct())
           
        }
        else{
             dispatch(createProductAsync(product))
        }
        navigate('/admin')
    })}>
      <div className='space-y-12 bg-white p-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Add Product
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-4'>
              <label
                htmlFor='title'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Product Name{' '}
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 '>
                  <input
                    type='text'
                    {...register('title', { required: 'Name is required' })}
                    id='Title'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>

            <div className='col-span-full'>
              <label
                htmlFor='description'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Description
              </label>
              <div className='mt-2'>
                <textarea
                  id='description'
                  {...register('description', {
                    required: 'description is required',
                  })}
                  rows={3}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  defaultValue={''}
                />
              </div>
              <p className='mt-3 text-sm leading-6 text-gray-600'>
                Write a few sentences about product.
              </p>
            </div>
            <div className='col-span-full'>
              <label
                htmlFor='description'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Brand
              </label>
              <div className='mt-2'>
                <select
                  {...register('brand', { required: 'Brand is required' })}
                >
                  <option value=''>--choose brand--</option>
                  {brands.map((brand) => (
                    <option key={brand.value} value={brand.value}>
                      {brand.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='col-span-full'>
              <label
                htmlFor='description'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Category
              </label>
              <div className='mt-2'>
                <select
                  {...register('category', {
                    required: 'Category is required',
                  })}
                >
                  <option value=''>--choose category--</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='price'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Price
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 '>
                  <input
                    type='number'
                    {...register('price', {
                      required: 'Price is required',
                      min: 1,
                      max: 10000,
                    })}
                    id='price'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='discountPercentage'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Discount
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 '>
                  <input
                    type='number'
                    {...register('discountPercentage', {
                      required: 'Discount Percentage is required',
                      min: 1,
                      max: 100,
                    })}
                    id='discountPercentage'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='stock'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Stock
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 '>
                  <input
                    type='number'
                    {...register('stock', {
                      required: 'Stock is required',
                      min: 0,
                    })}
                    id='stock'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>
            <div className='sm:col-span-6'>
              <label
                htmlFor='thumbnail'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Thumbnail
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 '>
                  <input
                    type='text'
                    {...register('thumbnail', {
                      required: 'Thumbnail is required',
                    })}
                    id='thumbnail'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>
            <div className='sm:col-span-6'>
              <label
                htmlFor='image1'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Image 1
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 '>
                  <input
                    type='text'
                    {...register('image1', { required: 'Image 1 is required' })}
                    id='image1'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>
            <div className='sm:col-span-6'>
              <label
                htmlFor='image2'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Image 2
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 '>
                  <input
                    type='text'
                    {...register('image2', { required: 'Image 2 is required' })}
                    id='image2'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>
            <div className='sm:col-span-6'>
              <label
                htmlFor='image3'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Image 3
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 '>
                  <input
                    type='text'
                    {...register('image3', { required: 'Image 3 is required' })}
                    id='image3'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>

            {/* <div className='col-span-full'>
              <label
                htmlFor='photo'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Photo
              </label>
              <div className='mt-2 flex items-center gap-x-3'>
                <UserCircleIcon
                  className='h-12 w-12 text-gray-300'
                  aria-hidden='true'
                />
                <button
                  type='button'
                  className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                >
                  Change
                </button>
              </div>
            </div>

            <div className='col-span-full'>
              <label
                htmlFor='cover-photo'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Cover photo
              </label>
              <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                <div className='text-center'>
                  <PhotoIcon
                    className='mx-auto h-12 w-12 text-gray-300'
                    aria-hidden='true'
                  />
                  <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                    <label
                      htmlFor='file-upload'
                      className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                    >
                      <span>Upload a file</span>
                      <input
                        id='file-upload'
                        name='file-upload'
                        type='file'
                        className='sr-only'
                      />
                    </label>
                    <p className='pl-1'>or drag and drop</p>
                  </div>
                  <p className='text-xs leading-5 text-gray-600'>
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
  </div>*/}
          </div>
        </div>

        
      </div>

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button
          type='button'
          className='text-sm font-semibold leading-6 text-gray-900'
        >
            
          Cancel
        </button>
       {selectedProduct&& <button
          type='button'
          onClick={handleDelete}
          className='rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
            
          Delete
        </button>}
        <button
          type='submit'
          className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default ProductForm
