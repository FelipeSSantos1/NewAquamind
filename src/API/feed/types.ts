export type GetAllFeedParams = {
  take: number
  cursor: number
}
export type CreatePostParams = {
  description: string | ''
  tankId?: number
  photos: {
    image: string
    width: number
    height: number
  }[]
}
export type CreatePostResponse = {
  id: number
  description?: string
  createdAt: Date
  updatedAt: Date
  tankId?: number
  profileId: number
  Photos: {
    id: number
    createdAt: Date
    updatedAt: Date
    type: 'PHOTO'
    width: number
    height: number
    url: string
    postId: number
  }
}
export type LikePostResponse = {
  postId: number
  profileId: number
  createdAt: Date
  updatedAt: Date
}
