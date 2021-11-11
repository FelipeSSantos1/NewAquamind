import API from '../../services/api'
import { AxiosError } from 'axios'

import { TankState } from '../../store/tank/types'
import { DeleteResponse, CreateParams } from './types'

export async function getAllByUser() {
  const result = API.get<TankState[]>('/tank/byUser')
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
export async function getById(tankId: number) {
  const result = API.get<TankState>(`/tank/${tankId}`)
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
export async function deleteTank(id: number) {
  const result = API.delete<DeleteResponse>(`/tank/${id}`)
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
export async function createTank(params: CreateParams) {
  const result = API.post<DeleteResponse>('/tank', params)
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
