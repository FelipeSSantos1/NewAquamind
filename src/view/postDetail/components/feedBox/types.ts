import { GetPostByIdResponse } from '../../../../API/feed/types'

export type FeedBoxProps = {
  showHeader?: boolean
  showFooter?: boolean
  feed: GetPostByIdResponse
}
