import { CommentState, SubComment } from '../../../../store/comment/types'

export type RowViewType = {
  sub: boolean
}
export type PropsType = {
  item: CommentState | SubComment
  likeFunction: () => void
  replyFunction: () => void
  deleteFunction: () => void
  refreshing: boolean
  sub: boolean
  renderDelete: boolean
  deleteRefreshing: boolean
}
