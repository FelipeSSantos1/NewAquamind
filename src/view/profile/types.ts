import * as yup from 'yup'

export const FormValidation = yup.object({
  name: yup.string(),
  country: yup.string(),
  bio: yup.string(),
  username: yup.string().required(),
})
export const FormResendValidation = yup.object({
  email: yup.string().email().required().lowercase().strict(),
})

export type FormData = {
  name: string
  username: string
  country: string
  bio: string
}
