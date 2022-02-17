import { File } from '../file/types'

type Plant = {
  id: number
  name: string
  description: string | null
  scientificName: string | null
  avatar: string | null
  createdAt: Date
  updatedAt: Date
  brandId: number | null
}
type Brand = {
  id: number
  name: string
  website: string
  logo: string | null
  createdAt: Date
  updatedAt: Date
}
export type PlantState = Plant & {
  Brand: Brand
  Photos: File[]
}
