// resources: https://www.youtube.com/watch?v=MukiK57qwVY

import React from 'react'
import { Alert, Image, StyleSheet, View } from 'react-native'
import PagerView from 'react-native-pager-view'
import _ from 'lodash'

import { baseImageUrl } from '../../../../services/constant'
import defaultAvatar from '../../../../assets/Avatar.png'
import theme from '../../../../theme'
import UserHeader from '../UserHeader'
import Footer from '../Footer'
import DoubleTap from '../../../components/doubleTap'
import { FeedBoxProps } from './types'

const FeedBox: React.FC<FeedBoxProps> = ({ feed, navigation }) => {
  const width = theme.sizes.width
  const maxHeightRatio =
    _.min(_.map(feed.Photos, photo => photo.width / photo.height)) || 1

  const viewWidth = theme.sizes.width
  const viewHeight = width / maxHeightRatio

  const dimentions = () => {
    if (feed.Tank?.length && feed.Tank?.width && feed.Tank?.height) {
      return `${feed.Tank?.length}x${feed.Tank?.width}x${feed.Tank?.height}`
    } else {
      return ''
    }
  }

  const renderImages = () => {
    return _.map(feed.Photos, photo => {
      const imageHeight = width * (photo.height / photo.width)
      return (
        <View key={photo.url}>
          <Image
            key={photo.id}
            source={{
              uri: `${baseImageUrl}/${photo.url}`,
            }}
            style={{
              width: width,
              height: imageHeight,
            }}
          />
        </View>
      )
    })
  }

  const likePost = () => {
    Alert.alert(`Like Post ${feed.id}`)
  }

  const styles = StyleSheet.create({
    pagerView: {
      width: viewWidth,
      height: viewHeight,
    },
  })

  return (
    <>
      <UserHeader
        userName={feed.Profile?.username || ''}
        url={feed.Profile?.avatar || defaultAvatar}
        dimensions={dimentions()}
        date={feed.createdAt}
        navigation={navigation}
        profileId={feed.profileId}
      />
      <DoubleTap onPress={likePost}>
        <PagerView style={styles.pagerView} initialPage={0} showPageIndicator>
          {renderImages()}
        </PagerView>
      </DoubleTap>
      <Footer
        liked
        likes={feed._count.LikePost}
        comments={feed._count.Comment}
        tankId={feed.tankId}
        navigation={navigation}
      />
    </>
  )
}

export default FeedBox
