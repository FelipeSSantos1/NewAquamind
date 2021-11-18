import * as yup from 'yup'

export const FormValidation = yup.object({
  subject: yup.string().required('required'),
  text: yup.string().required('required'),
})
export type FormData = {
  subject: string
  text: string
}
