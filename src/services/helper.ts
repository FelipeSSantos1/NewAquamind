import AvatarImg from '../assets/Avatar.png'
import { baseImageUrl } from './constant'

export const fullImageUrl = (image: string | null | undefined) => {
  return image ? { uri: `${baseImageUrl}/${image}` } : AvatarImg
}
