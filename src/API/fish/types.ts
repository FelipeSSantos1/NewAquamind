import { File } from '../../store/file/types'

type Fish = {
  id: number
  scientificName: string | null
  commonName: string | null
  description: string | null
  behaviour: string | null
  diet: string | null
  ph: string | null
  temperature: string | null
  tankSize: string | null
  size: string | null
  origin: string | null
  thumb: string | null
  source: string | null
  createdAt: string
  updatedAt: string
}

export type getAllFishResponse = {
  id: number
  commonName: string
  scientificName: string
  thumb: string
  Photos: File[]
}

export type getByIDFishResponse = Fish & {
  Photos: File[]
}
