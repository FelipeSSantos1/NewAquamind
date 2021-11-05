import { UserState } from 'store/user/types'
import { Feed } from '../../../../store/feed/types'
import { NavPropsFeed } from '../../../../routes/types'

export type FooterProps = Pick<NavPropsFeed, 'navigation'> & {
  feedId: number
  tankId?: number
  liked: boolean
  likes: number
  comments: number
  feeds: Feed[]
  user: UserState
  description?: string
  username: string
  profileId: number
}
