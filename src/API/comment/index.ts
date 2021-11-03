import API from '../../services/api'
import { AxiosError } from 'axios'

import {
  LikeCommentResponse,
  AddCommentResponse,
  AddCommentParam,
} from './types'
import { CommentState } from '../../store/comment/types'

export async function getAllByPost(postId: number) {
  const result = API.get<CommentState[]>(`/comment/${postId}`)
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
export async function likeComment(commentId: number) {
  const result = API.post<LikeCommentResponse>('/comment/like', { commentId })
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
export async function dislikeComment(commentId: number) {
  const result = API.delete<LikeCommentResponse>(`/comment/like/${commentId}`)
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
export async function addComment(param: AddCommentParam) {
  const result = API.post<AddCommentResponse>('/comment', param)
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
