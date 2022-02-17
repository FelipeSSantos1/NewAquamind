import { File } from '../file/types'

type Stone = {
  id: number
  name: string
  description: string | null
  recommendation: string | null
  source: string | null
  createdAt: Date
  updatedAt: Date
}
export type StoneState = Stone & {
  Photos: File[]
}
