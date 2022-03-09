import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CommentState } from './types'

const initialState: CommentState[] = []

export default createSlice({
  name: 'comment',
  initialState,
  reducers: {
    logout: () => initialState,
    setComment: (state, action: PayloadAction<CommentState[]>) => action.payload,
  },
})
