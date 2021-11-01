import { NavPropsFeed } from '../../../../routes/types'

export type UserHeaderProps = Pick<NavPropsFeed, 'navigation'> & {
  url?: string
  userName: string
  dimensions: string
  date: string
  profileId: number
}
