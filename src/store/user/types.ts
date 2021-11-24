export type Profile = {
  id: number
  username: string
  name?: string
  country?: string
  bio?: string
  avatar?: string
}
type ProfileCountOutputType = {
  Following: number
  Followers: number
  Tanks: number
  LikePost: number
  Comment: number
  LikeComment: number
  Posts: number
}
export type User = {
  id: string
  email: string
  active: boolean
  emailVerified: boolean
  role: 'USER' | 'ADMIN'
  createdAt: string
  updatedAt: string
  profileId: number
}

export type UserState = User & {
  Profile: Profile
  _count?: ProfileCountOutputType
}

export type SetProfile = Profile & {
  User: User
  _count: ProfileCountOutputType
}
