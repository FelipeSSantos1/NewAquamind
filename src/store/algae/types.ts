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
  algaeId: number | null
}
type Algae = {
  id: number
  name: string
  description: string | null
  cause: string | null
  treatment: string | null
  source: string | null
  createdAt: Date
  updatedAt: Date
}
export type AlgaeState = Algae & {
  Photos: File[]
}
