import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  fetchLoggedInUser,
  fetchLoggedInUserOrders,
  updateUser,
} from './userAPI'

const initialState = {
  orders:[],
  status: 'idle',
  userInfo: null,
}

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId)
    return response.data
  }
)
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (userInfo) => {
    const response = await updateUser(userInfo)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
)

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (userId) => {
    const response = await fetchLoggedInUser(userId)
    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.orders = action.payload
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.userInfo = action.payload
      })
      .addCase(fetchLoggedInUserAsync.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.userInfo = action.payload
      })
  },
})

export const { increment, decrement, incrementByAmount } = userSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserOrder = (state) => state.user.orders
export const selectUserInfo = (state) => state.user.userInfo

export default userSlice.reducer
