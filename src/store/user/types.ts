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
  profileId: number | null
  profile: Profile | null
  accessToken?: string
  refreshToken?: string
}
