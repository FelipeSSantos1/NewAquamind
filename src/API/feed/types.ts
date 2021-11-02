export type GetAllFeedParams = {
  take: number
  cursor: number
}
export type LikePostResponse = {
  postId: number
  profileId: number
  createdAt: Date
  updatedAt: Date
}
