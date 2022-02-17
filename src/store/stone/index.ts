import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StoneState } from './types'

const initialState: StoneState[] = []

export default createSlice({
  name: 'stone',
  initialState,
  reducers: {
    logout: () => initialState,
    setStone: (state, action: PayloadAction<StoneState[]>) => action.payload,
  },
})
