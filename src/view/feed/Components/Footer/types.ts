import { NavPropsFeed } from '../../../../routes/types'

export type FooterProps = Pick<NavPropsFeed, 'navigation'> & {
  tankId?: number
  liked: boolean
  likes: number
  comments: number
}
