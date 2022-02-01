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
type FileType = {
  PHOTO: 'PHOTO'
}
type File = {
  id: number
  createdAt: Date
  updatedAt: Date
  type: FileType
  title: string | null
  height: number | null
  width: number | null
  url: string
  postId: number | null
  plantId: number | null
  fertilizerId: number | null
}
export type PlantDetail = Plant & {
  Brand: Brand
  Photos: File[]
}
