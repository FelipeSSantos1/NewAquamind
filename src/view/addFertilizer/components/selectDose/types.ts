import * as yup from 'yup'

export const formValidation = yup.object({
  dose: yup
    .string()
    .matches(/^([1-9]{1}\d{0,2}|\d{1,3}\.[1-9]{1})$/, 'between 0.1 and 999.9')
    .required('required'),
})
export type SelectDoseProps = {
  visible: boolean
  onDismiss: CallableFunction
  fertilizerId: number
  fertilizerName: string
  // fertilizerData: {
  //   id: number
  //   name: string
  //   dose: string
  // }[]
}
export type FormData = {
  dose: string
}
