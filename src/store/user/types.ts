type Profile = {
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
  active: boolean
  emailVerified: boolean
  role: string
  profileId: number
  accessToken?: string
  refreshToken?: string
  profile: Profile
}
