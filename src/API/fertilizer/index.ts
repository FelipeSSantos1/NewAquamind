import API from '../../services/api'
import { AxiosError } from 'axios'

import { FertilizerState } from '../../store/fertilizer/types'

export async function getAll() {
  const result = API.get<FertilizerState[]>('/fertilizer')
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
