import * as yup from 'yup'

export const formValidation = yup.object().shape({
  name: yup.string().required(),
  born: yup
    .string()
    .matches(
      /^((\d{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|02-(0[1-9]|1\d|2[0-8])))|((\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00)-02-29))$/,
      'invalid date, format is YYYY-MM-DD'
    ),
  length: yup
    .string()
    .matches(/^([1-9]{1}\d{0,2})$/, 'between 1 and 999')
    .required('required'),
  width: yup
    .string()
    .matches(/^([1-9]{1}\d{0,2})$/, 'between 1 and 999')
    .required('required'),
  height: yup
    .string()
    .matches(/^([1-9]{1}\d{0,2})$/, 'between 1 and 999')
    .required('required'),
  light: yup.string(),
  gravel: yup.string(),
  co2: yup.string().matches(/^(\d{0,1}|(\d\.\d))$/, 'between 0 and 9.9'),
  dayLight: yup.string().matches(/^(\d{0,1}|(\d\.\d))$/, 'between 0 and 9.9'),
  filter: yup.string(),
  description: yup.string(),
  avatar: yup.string(),
  location: yup.string(),
})

export type FormData = {
  name: string
  born: string
  length: string
  width: string
  height: string
  light: string
  gravel: string
  co2: string
  dayLight: string
  filter: string
  description: string
  avatar: string
  location: string
}
export type SmallTextProps = {
  marginRight?: boolean
}
export type FertilizerListType = {
  id: number
  name: string
  dose: string
}
export type PlantListType = {
  plantId: number
  name: string
}
