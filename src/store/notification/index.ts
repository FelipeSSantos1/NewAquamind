import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NotificationState } from './types'

const initialState: NotificationState[] = []

export default createSlice({
  name: 'notification',
  initialState,
  reducers: {
    logout: () => initialState,
    setNotification: (state, action: PayloadAction<NotificationState[]>) => action.payload,
  },
})
