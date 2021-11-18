export type SendOneResponse = {
  id: number
  expoId: string | null
  title: string | null
  read: boolean
  message: string
  createdAt: Date
  updatedAt: Date
  commentId: number | null
  postId: number | null
  toProfileId: number | null
  fromProfileId: number | null
}
export type sendOneProps = {
  to: number
  title: string
  body: string
  postId?: number
  commentId?: number
  data?: {
    url: string
  }
}
