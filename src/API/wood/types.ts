import { File } from '../../store/file/types'

export type Wood = {
  id: number
  name: string | null
  description: string | null
  thumb: string | null
  source: string | null
  createdAt: string
  upstringdAt: string
}

export type getAllWoodResponse = {
  id: number
  name: string
  thumb: string
}

export type getByIDWoodResponse = Wood & {
  Photos: File[]
}
