import * as yup from 'yup'

export const formValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(7).required(),
})
export type FormData = {
  email: string
  password: string
}
export type FeedImageProps = {
  width: number
  height: number
}
