import * as yup from 'yup'

export const FormValidation = yup.object({
  password: yup.string().min(7).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password does not match')
    .required('Required'),
})

export type FormData = {
  password: string
  confirmPassword: string
}
