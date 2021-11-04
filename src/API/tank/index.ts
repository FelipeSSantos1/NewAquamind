import API from '../../services/api'
import { AxiosError } from 'axios'

import { TankState } from '../../store/tank/types'

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
