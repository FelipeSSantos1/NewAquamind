import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

import Logout from '../store/logout'

const baseURL = __DEV__
  ? 'http://192.168.0.101:3000'
  : 'https://aquamind.app/api'
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  async config => {
    const token = await SecureStore.getItemAsync('accessToken')
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  res => res,
  async error => {
    const originalConfig = error.config
    const UNAUTHORIZED = 401

    if (
      error.response &&
      error.response.status === UNAUTHORIZED &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true

      const token = await SecureStore.getItemAsync('refreshToken')
      const refreshAccessTokenAPI = axios.create({
        baseURL,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return refreshAccessTokenAPI
        .get('/auth/refreshAccessToken', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async refreshTokenResponse => {
          const { accessToken } = refreshTokenResponse.data
          await SecureStore.setItemAsync('accessToken', accessToken)
          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

          return api(originalConfig)
        })
        .catch(_error => {
          if (_error.response.status === UNAUTHORIZED) {
            Logout()
          }
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data)
          }

          return Promise.reject(_error)
        })
    }

    return Promise.reject(error)
  }
)

export default api
