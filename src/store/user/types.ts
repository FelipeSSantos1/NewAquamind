export type Profile = {
  id: number
  username: string
  name?: string
  country?: string
  bio?: string
  avatar?: string
}

export type UserState = {
  id: string
  email: string
  password: string
  active: boolean
  emailVerified: boolean
  role: 'USER' | 'ADMIN'
  createdAt: string
  updatedAt: string
  profileId: number
  profile: Profile
  accessToken?: string
  refreshToken?: string
}
