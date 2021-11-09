import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FertilizerState } from './types'

const initialState: FertilizerState[] = []

export default createSlice({
  name: 'fertilizer',
  initialState,
  reducers: {
    logout: () => initialState,
    setFertilizer: (state, action: PayloadAction<FertilizerState[]>) =>
      action.payload,
  },
})
