import API from '../../services/api'

import { GetAllFeedParams } from './types'
import { AxiosError } from 'axios'

import { Feed } from '../../store/feed/types'

export async function getAllFeed({ take, cursor }: GetAllFeedParams) {
  const result = API.get<Feed[]>(`/post/paginate/${take || 10}/${cursor || 0}`)
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
