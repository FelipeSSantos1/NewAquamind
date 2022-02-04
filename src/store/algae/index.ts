import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlgaeState } from './types'

const initialState: AlgaeState[] = []

export default createSlice({
  name: 'algae',
  initialState,
  reducers: {
    logout: () => initialState,
    setAlgae: (state, action: PayloadAction<AlgaeState[]>) => action.payload,
  },
})
