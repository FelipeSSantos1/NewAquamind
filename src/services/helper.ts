import AvatarImg from '../assets/Avatar.png'
import { baseImageUrl } from './constant'

export const fullImageUrl = (image: string | null | undefined) => {
  return image ? { uri: `${baseImageUrl}/${image}` } : AvatarImg
}
export const likeCommentNotificationTitle = 'Comment Liked'
export const likeCommentNotificationBody = (name: string) => {
  return `${name} liked your comment`
}
export const likePostNotificationTitle = 'Post Liked'
export const likePostNotificationBody = (name: string) => {
  return `${name} liked your post`
}
export const deepLinkURL = 'aquamindapp://'
