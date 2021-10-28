import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from './types'

const initialState: UserState = {
  email: '',
  name: '',
  username: '',
  avatar: '',
}

export default createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<UserState>) => action.payload,
    setEmail: (state, action: PayloadAction<string>) => {
      return { ...state, email: action.payload }
    },
    setName: (state, action: PayloadAction<string>) => {
      return { ...state, name: action.payload }
    },
  },
})
