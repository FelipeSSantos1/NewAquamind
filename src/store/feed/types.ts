import { Profile } from '../user/types'

type Photo = {
  id: number
  url: string
  width: number
  height: number
}
type LikePost = {
  postId: number
  profileId: number
}
type Count = {
  Comment: number
  LikePost: number
}
type Tank = {
  id: number
  length: number
  width: number
  height: number
  location?: string
}

export type Feed = {
  id: number
  createdAt: string
  profileId: number
  description?: string
  tankId?: number
  Photos: Photo[]
  Profile: Profile
  Tank?: Tank
  LikePost: LikePost[]
  _count: Count
}
