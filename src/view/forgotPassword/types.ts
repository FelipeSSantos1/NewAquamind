import * as yup from 'yup'

export const formValidation = yup.object().shape({
  email: yup.string().email().required().lowercase().strict(),
})

export type FormData = {
  email: string
}
