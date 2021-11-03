import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import PagerView from 'react-native-pager-view'
import { useDispatch, useSelector } from 'react-redux'
import * as Haptics from 'expo-haptics'
import _ from 'lodash'

import { baseImageUrl } from '../../../../services/constant'
import defaultAvatar from '../../../../assets/Avatar.png'
import theme from '../../../../theme'
import UserHeader from '../userHeader'
import Footer from '../footer'
import DoubleTap from '../../../components/doubleTap'
import { FeedBoxProps } from './types'
import ConfigRTK from '../../../../store/config'
import FeedRTK from '../../../../store/feed'
import * as API from '../../../../API/feed'
import { RootState } from 'store/rootReducer'

const FeedBox: React.FC<FeedBoxProps> = ({ navigation, feed }) => {
  const dispatch = useDispatch()
  const feeds = useSelector((state: RootState) => state.feed)
  const user = useSelector((state: RootState) => state.user)

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

  const likePost = async (feedId: number) => {
    const postIndex = _.findIndex(feeds, { id: feedId })
    if (feeds[postIndex].LikePost.length) {
      return
    }

    feeds[postIndex].LikePost = [
      {
        postId: feedId,
        profileId: user.profileId,
      },
    ]
    feeds[postIndex]._count.LikePost = feeds[postIndex]._count.LikePost + 1
    dispatch(FeedRTK.actions.setFeed([...feeds]))

    const response = await API.likePost(feedId)
    if (!response) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      feeds[postIndex].LikePost = []
      feeds[postIndex]._count.LikePost = feeds[postIndex]._count.LikePost - 1
      dispatch(FeedRTK.actions.setFeed([...feeds]))

      return
    }
    if ('statusCode' in response) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      feeds[postIndex].LikePost = []
      feeds[postIndex]._count.LikePost = feeds[postIndex]._count.LikePost - 1
      dispatch(FeedRTK.actions.setFeed([...feeds]))

      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: response.message,
          okText: 'Ok',
        })
      )
      return
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
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
      <DoubleTap
        onPress={_.debounce(() => likePost(feed.id), 500, { leading: true })}
      >
        <PagerView style={styles.pagerView} initialPage={0} showPageIndicator>
          {renderImages()}
        </PagerView>
      </DoubleTap>
      <Footer
        liked={!!feed.LikePost.length}
        likes={feed._count.LikePost}
        comments={feed._count.Comment}
        tankId={feed.tankId}
        feedId={feed.id}
        navigation={navigation}
      />
    </>
  )
}

export default FeedBox
