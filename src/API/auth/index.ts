import API from '../../services/api'

import { AuthParams, CreateAccountResponse, ResendEmailParams } from './types'
import { AxiosError } from 'axios'

import { UserState } from '../../store/user/types'

export async function login(params: AuthParams) {
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

export async function createAccount(params: AuthParams) {
  const result = API.post<CreateAccountResponse>('/user', params)
    .then(response => {
      if (response && response.status === 201) {
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

export async function resendEmail(params: ResendEmailParams) {
  const result = API.post<boolean>('/user/sendVerifyEmail', params)
    .then(response => {
      if (response && response.status === 201) {
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
