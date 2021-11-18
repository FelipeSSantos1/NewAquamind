import API from '../../services/api'
import { AxiosError } from 'axios'

import { sendProps } from './types'

export async function send(params: sendProps) {
  const result = API.post<boolean>('/mail/contactUs', params)
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
