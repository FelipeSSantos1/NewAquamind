import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

const baseURL = 'http://192.168.0.115:3000'
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
  res => {
    return res
  },
  async err => {
    const originalConfig = err.config

    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
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
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data)
            }

            return Promise.reject(_error)
          })
      }
    }

    return Promise.reject(err)
  }
)

export default api
