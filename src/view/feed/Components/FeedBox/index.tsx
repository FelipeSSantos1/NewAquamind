// resources: https://www.youtube.com/watch?v=MukiK57qwVY

import React from 'react'
import { Image } from 'react-native'

import { baseImageUrl } from '../../../../services/constant'
import defaultAvatar from '../../../../assets/Avatar.png'
import theme from '../../../../theme'
import UserHeader from '../UserHeader'
import Footer from '../Footer'
import { Feed } from '../../../../store/feed/types'
// import DoubleTap from '../../../Components/DoubleTap/index.js'

type FeedBoxProps = {
  feed: Feed
  navigation: any
}
export default ({ feed, navigation }: FeedBoxProps) => {
  const ratioWidth = theme.sizes.width
  const ratioHeight =
    theme.sizes.width * (feed.Photos[0].height / feed.Photos[0].width)

  const dimentions = () => {
    if (feed.Tank?.length && feed.Tank?.width && feed.Tank?.height) {
      return `${feed.Tank?.length}x${feed.Tank?.width}x${feed.Tank?.height}`
    } else {
      return ''
    }
  }

  return (
    <>
      <UserHeader
        userName={feed.Profile?.username || ''}
        url={feed.Profile?.avatar || defaultAvatar}
        dimensions={dimentions()}
        date={feed.createdAt}
      />
      {/* <DoubleTap
        style={{ zIndex: 2 }}
        onPress={() => Alert.alert('Like the picture function')}
      > */}
      <Image
        source={{
          uri: `${baseImageUrl}/${feed.Photos[0].url}`,
        }}
        style={{
          width: ratioWidth,
          height: ratioHeight,
        }}
      />
      {/* </DoubleTap> */}
      <Footer
        liked
        likes={feed._count.LikePost}
        comments={feed._count.Comment}
      />
    </>
  )
}
