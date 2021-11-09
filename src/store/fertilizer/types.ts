type File = {
  id: number
  createdAt: Date
  updatedAt: Date
  type: 'PHOTO'
  title: string | null
  height: number | null
  width: number | null
  url: string
  postId: number | null
  plantId: number | null
  fertilizerId: number | null
}
type Brand = {
  id: number
  name: string
  website: string
  logo: string | null
  createdAt: Date
  updatedAt: Date
}
type Fertilizer = {
  id: number
  name: string
  description: string | null
  unit: string
  avatar: string | null
  createdAt: Date
  updatedAt: Date
  brandId: number | null
}
export type FertilizerState = Fertilizer & {
  Brand: Brand
  Photos: File[]
}
