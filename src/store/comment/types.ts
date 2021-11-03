export type Comment = {
  id: number
  comment: string
  createdAt: Date
  updatedAt: Date
  parentId: number | null
  postId: number
  profileId: number
}

type Profile = {
  id: number
  name: string
  username: string
  avatar: string
}
type LikeComment = {
  commentId: number
  profileId: number
}

export type CommentState = Comment & {
  Profile: Profile
  LikeComment: LikeComment[]
  Comment: (Comment & {
    Profile: Profile
    LikeComment: LikeComment[]
    _count: {
      LikeComment: number
    }
  })[]
  _count: {
    LikeComment: number
  }
}

export type SubComment = Comment & {
  Profile: Profile
  LikeComment: LikeComment[]
  _count: {
    LikeComment: number
  }
}
