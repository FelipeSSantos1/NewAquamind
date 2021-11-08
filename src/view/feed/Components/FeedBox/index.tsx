import React from 'react'
import { StyleSheet } from 'react-native'
import Image from 'react-native-fast-image'
import PagerView from 'react-native-pager-view'
import { useDispatch } from 'react-redux'
import * as Haptics from 'expo-haptics'
import produce from 'immer'
import _ from 'lodash'

import { fullImageUrl } from '../../../../services/helper'
import theme from '../../../../theme'
import UserHeader from '../userHeader'
import Footer from '../footer'
import DoubleTap from '../../../components/doubleTap'
import { FeedBoxProps } from './types'
import ConfigRTK from '../../../../store/config'
import FeedRTK from '../../../../store/feed'
import * as API from '../../../../API/feed'
import { ContentView, PaperImage, BlurBackground } from './styles'

const FeedBox: React.FC<FeedBoxProps> = ({ navigation, feed, feeds, user }) => {
  const dispatch = useDispatch()

  const width = theme.sizes.width
  const maxHeightRatio =
    _.min(_.map(feed.Photos, photo => photo.width / photo.height)) || 1
  const viewWidth = theme.sizes.width
  const heightRatio = width / maxHeightRatio
  const viewHeight = heightRatio > viewWidth ? viewWidth : heightRatio

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
      const imageWidth = width * (photo.width / photo.height)
      const landscape = photo.width > photo.height
      return (
        <ContentView key={photo.id}>
          <PaperImage resizeMode="cover" source={fullImageUrl(photo.url)} />
          <BlurBackground intensity={100}>
            <Image
              source={fullImageUrl(photo.url)}
              style={{
                width: landscape ? width : imageWidth,
                height: landscape ? imageHeight : width,
              }}
            />
          </BlurBackground>
        </ContentView>
      )
    })
  }

  const likePost = async (feedId: number) => {
    const postIndex = _.findIndex(feeds, { id: feedId })
    if (feeds[postIndex].LikePost.length) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      return
    }

    const newFeed = produce(feeds, draft => {
      draft[postIndex].LikePost = [
        {
          postId: feedId,
          profileId: user.profileId,
        },
      ]
      feeds[postIndex]._count.LikePost += 1
    })
    dispatch(FeedRTK.actions.logout())
    dispatch(FeedRTK.actions.setFeed(newFeed))

    const response = await API.likePost(feedId)
    if (!response) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      const newFeedError = produce(feeds, draft => {
        draft[postIndex].LikePost = []
        feeds[postIndex]._count.LikePost -= 1
      })
      dispatch(FeedRTK.actions.logout())
      dispatch(FeedRTK.actions.setFeed(newFeedError))

      return
    }
    if ('statusCode' in response) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      const newFeedError = produce(feeds, draft => {
        draft[postIndex].LikePost = []
        feeds[postIndex]._count.LikePost -= 1
      })
      dispatch(FeedRTK.actions.logout())
      dispatch(FeedRTK.actions.setFeed(newFeedError))

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
        userName={feed.Profile.username}
        url={feed.Profile?.avatar}
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
        feeds={feeds}
        user={user}
        description={feed.description}
        username={feed.Profile.username}
        profileId={feed.profileId}
      />
    </>
  )
}

export default FeedBox
