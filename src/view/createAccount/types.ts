import * as yup from 'yup'

export const FormValidation = yup.object({
  email: yup.string().email().required().lowercase().strict(),
  password: yup.string().min(7).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password does not match')
    .required('Required'),
})
export const FormResendValidation = yup.object({
  email: yup.string().email().required().lowercase().strict(),
})

export type FormData = {
  email: string
  password: string
  confirmPassword: string
}
