import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConfigState, AlertState, LoadingState } from './types'

const initialState: ConfigState = {
  loading: {
    visible: false,
    loadingMessage: 'Loading',
  },
  authenticated: false,
  drawerVisible: false,
  alert: {
    visible: false,
    alertTitle: ' ',
    alertMessage: ' ',
    cancelText: ' ',
    okPress: null,
    okText: ' ',
  },
}

export default createSlice({
  name: 'config',
  initialState,
  reducers: {
    logout: () => initialState,
    hideAlert: state => {
      return {
        ...state,
        alert: initialState.alert,
      }
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        authenticated: action.payload,
      }
    },
    showDrawer: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        drawerVisible: action.payload,
      }
    },
    setAlert: (state, action: PayloadAction<AlertState>) => {
      return {
        ...state,
        alert: action.payload,
      }
    },
    setLoading: (state, action: PayloadAction<LoadingState>) => {
      return {
        ...state,
        loading: action.payload,
      }
    },
  },
})
