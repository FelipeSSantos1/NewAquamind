import API from '../../services/api'

import { LoginParams } from './types'
import { AxiosError } from 'axios'

import { UserState } from '../../store/user/types'

export async function login(params: LoginParams) {
  const result = API.post<UserState>('/auth/login', params)
    .then(response => {
      if (response && response.status === 200) {
        return response.data
      }
    })
    .catch((error: AxiosError) => {
      if (error && error.response) {
        return error.response.data as CommonAPIError
      }
    })

  return result
}
