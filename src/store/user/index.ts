import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState, SetProfile } from './types'

const initialState: UserState = {
  id: '',
  email: '',
  active: false,
  emailVerified: false,
  role: 'USER',
  createdAt: '',
  updatedAt: '',
  pnToken: '',
  profileId: 0,
  Profile: {
    id: 0,
    username: '',
  },
  _count: undefined,
}

export default createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<UserState>) => action.payload,
    setProfile: (state, action: PayloadAction<SetProfile>) => {
      const { User, _count, ...rest } = action.payload
      return { ...User, _count, Profile: rest }
    },
    setToken: (state, action: PayloadAction<string>) => {
      return { ...state, pnToken: action.payload }
    },
  },
})
