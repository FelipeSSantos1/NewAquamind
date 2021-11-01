import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Feed } from './types'

const initialState: Feed[] = []

export default createSlice({
  name: 'feed',
  initialState,
  reducers: {
    logout: () => initialState,
    setFeed: (state, action: PayloadAction<Feed[]>) => action.payload,
  },
})
