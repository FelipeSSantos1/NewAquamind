export type LikeCommentResponse = {
  commentId: number
  profileId: number
  createdAt: Date
  updatedAt: Date
}
export type AddCommentParam = {
  postId: number
  comment: string
  parentId?: number
}
export type AddCommentResponse = {
  id: number
  comment: number
  createdAt: Date
  updatedAt: Date
  postId: number
  profileId: number
}
