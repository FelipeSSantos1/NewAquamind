import { TankState } from '../../../../store/tank/types'

export type StripProps = {
  title: string
  createdAt: Date | null
  dimensions: string
  imageURL?: string | null
  tank: TankState
  onDelete: CallableFunction
  onUpdate: CallableFunction
  loadingDelete: boolean
}
