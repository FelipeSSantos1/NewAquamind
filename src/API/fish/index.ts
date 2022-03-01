import API from '../../services/api'
import { AxiosError } from 'axios'

import { getAllFishResponse, getByIDFishResponse } from './types'

export async function getAll() {
  const result = API.get<getAllFishResponse[]>('/fish')
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

export async function getByID(id: number) {
  const result = API.get<getByIDFishResponse>(`/fish/${id}`)
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
