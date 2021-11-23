import React from 'react'
import { StyleSheet, Animated, View } from 'react-native'
import Image from 'react-native-fast-image'
import PagerView, {
  PagerViewOnPageScrollEventData,
} from 'react-native-pager-view'
import { useDispatch } from 'react-redux'
import * as Haptics from 'expo-haptics'
import produce from 'immer'
import _ from 'lodash'

import {
  fullImageUrl,
  likePostNotificationBody,
  likePostNotificationTitle,
  deepLinkURL,
} from '../../../../services/helper'
import theme from '../../../../theme'
import UserHeader from '../userHeader'
import Footer from '../footer'
import DoubleTap from '../../../components/doubleTap'
import { FeedBoxProps } from './types'
import ConfigRTK from '../../../../store/config'
import FeedRTK from '../../../../store/feed'
import * as API from '../../../../API/feed'
import * as NotificationAPI from '../../../../API/notification'
import { ScalingDot } from 'react-native-animated-pagination-dots'
import { ContentView, PaperImage, BlurBackground, styles } from './styles'

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

const FeedBox: React.FC<FeedBoxProps> = ({ navigation, feed, feeds, user }) => {
  const dispatch = useDispatch()
  const ref = React.useRef<PagerView>(null)

  const width = theme.sizes.width
  const maxHeightRatio =
    _.min(_.map(feed.Photos, photo => photo.width / photo.height)) || 1
  const viewWidth = theme.sizes.width
  const heightRatio = width / maxHeightRatio
  const viewHeight = heightRatio > viewWidth ? viewWidth : heightRatio

  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current
  const inputRange = [0, feed.Photos.length]
  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, feed.Photos.length * width],
  })

  const onPageScroll = React.useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: false,
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

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
    dispatch(FeedRTK.actions.setFeed(newFeed))

    const response = await API.likePost(feedId)
    if (!response) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      const newFeedError = produce(feeds, draft => {
        draft[postIndex].LikePost = []
        feeds[postIndex]._count.LikePost -= 1
      })
      dispatch(FeedRTK.actions.setFeed(newFeedError))

      return
    }
    if ('statusCode' in response) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      const newFeedError = produce(feeds, draft => {
        draft[postIndex].LikePost = []
        feeds[postIndex]._count.LikePost -= 1
      })
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

    NotificationAPI.sendOne({
      to: feeds[postIndex].Profile.id,
      title: likePostNotificationTitle,
      postId: feeds[postIndex].id,
      body: likePostNotificationBody(user.Profile.username),
      data: {
        url: `${deepLinkURL}likePostComment/${feeds[postIndex].id}`,
      },
    })
  }

  const stylesPagerView = StyleSheet.create({
    PagerView: {
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
        <AnimatedPagerView
          initialPage={0}
          ref={ref}
          style={stylesPagerView.PagerView}
          onPageScroll={onPageScroll}
        >
          {renderImages()}
        </AnimatedPagerView>
        {feed.Photos.length > 1 && (
          <View style={styles.dotsContainer}>
            <View style={styles.dotContainer}>
              <ScalingDot
                data={feed.Photos}
                //@ts-ignore
                scrollX={scrollX}
                containerStyle={styles.containerStyle}
                inActiveDotColor={theme.colors.text}
                activeDotColor={theme.colors.text}
                dotStyle={styles.dot}
              />
            </View>
          </View>
        )}
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
