import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlantState } from './types'

const initialState: PlantState[] = []

export default createSlice({
  name: 'plant',
  initialState,
  reducers: {
    logout: () => initialState,
    setFertilizer: (state, action: PayloadAction<PlantState[]>) =>
      action.payload,
  },
})
