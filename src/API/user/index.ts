import API from '../../services/api'
import { AxiosError } from 'axios'

import { SetProfile, Profile, User } from '../../store/user/types'
import { updateProfileParams } from './types'

export async function getProfile() {
  const result = API.get<SetProfile>('/user/profile/profile')
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
export async function updatePhoto(params: { avatar: string }) {
  const result = API.patch<Profile>('/user/updatePhoto', params)
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
export async function updateProfile(params: updateProfileParams) {
  const result = API.patch<SetProfile>('/user/updateProfile', params)
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
export async function updatePNToken(token: string) {
  const result = API.patch<User>('/user/updatePNToken', { token })
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
