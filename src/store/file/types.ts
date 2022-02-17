type FileType = {
  PHOTO: 'PHOTO'
}
export type File = {
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
  algaeId: number | null
  stoneId: number | null
}
