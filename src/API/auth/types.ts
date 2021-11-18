import { UserState } from '../../store/user/types'
export type AuthParams = {
  email: string
  password: string
}
export type ResendEmailParams = {
  email: string
}
export type ForgotPasswordParams = {
  email: string
  ip: string
  device: string
}

export type CreateAccountResponse = {
  emailSent: boolean
  id: string
  email: string
  password: string
  active: boolean
  emailVerified: boolean
  role: 'USER' | 'ADMIN'
  createdAt: string
  updatedAt: string
  profileId: number
}
export type ForgotPasswordResponse = {
  emailSent: boolean
}
export type LoginResponse = UserState & {
  accessToken?: string
  refreshToken?: string
}
