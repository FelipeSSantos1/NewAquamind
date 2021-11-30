import API from '../../services/api'
import { AxiosError } from 'axios'

import { SendOneResponse, sendOneProps } from './types'
import { NotificationState } from '../../store/notification/types'

export async function sendOne(params: sendOneProps) {
  const result = API.post<SendOneResponse>('/notification/one', params)
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

export async function getAllByUser() {
  const result = API.get<NotificationState[]>('/notification')
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
