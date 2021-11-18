import API from '../../services/api'
import { AxiosError } from 'axios'

import {
  GetAllFeedParams,
  LikePostResponse,
  CreatePostParams,
  CreatePostResponse,
  DeletePostResponse,
  GetPostByIdResponse,
} from './types'
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
export async function likePost(postId: number) {
  const result = API.post<LikePostResponse>('/post/like', { postId })
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
export async function dislikePost(postId: number) {
  const result = API.delete<LikePostResponse>(`/post/like/${postId}`)
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
export async function createPost(params: CreatePostParams) {
  const result = API.post<CreatePostResponse>('/post', params)
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
export async function deletePost(postId: number) {
  const result = API.delete<DeletePostResponse>(`/post/${postId}`)
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
export async function getById(postId: number) {
  const result = API.get<GetPostByIdResponse>(`/post/${postId}`)
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
