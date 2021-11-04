import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TankState } from './types'

const initialState: TankState[] = []

export default createSlice({
  name: 'tank',
  initialState,
  reducers: {
    logout: () => initialState,
    setTank: (state, action: PayloadAction<TankState[]>) => action.payload,
  },
})
