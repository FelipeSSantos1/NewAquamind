import { UserState } from 'store/user/types'
import { Feed } from '../../../../store/feed/types'

export type FeedBoxProps = {
  feed: Feed
  navigation: any
  feeds: Feed[]
  user: UserState
}
