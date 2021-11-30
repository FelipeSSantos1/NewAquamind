export type NotificationState = {
  id: number
  title: string | null
  read: boolean
  message: string
  createdAt: Date
  commentId: number | null
  postId: number | null
  toProfileId: number | null
  fromProfileId: number | null
}
