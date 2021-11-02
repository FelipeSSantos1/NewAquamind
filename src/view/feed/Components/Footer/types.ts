import { NavPropsFeed } from '../../../../routes/types'

export type FooterProps = Pick<NavPropsFeed, 'navigation'> & {
  feedId: number
  tankId?: number
  liked: boolean
  likes: number
  comments: number
}
