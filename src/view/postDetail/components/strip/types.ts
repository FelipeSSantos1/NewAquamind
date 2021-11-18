import { CommentState, SubComment } from '../../../../store/comment/types'

export type RowViewType = {
  sub: boolean
  highlight?: boolean
}
export type StripProps = {
  item: CommentState | SubComment
  sub: boolean
  highlight?: boolean
}
