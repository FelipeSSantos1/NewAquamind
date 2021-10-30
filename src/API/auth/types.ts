export type AuthParams = {
  email: string
  password: string
}

export type ResendEmailParams = {
  email: string
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
