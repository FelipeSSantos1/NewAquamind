import React from 'react'
import { StyleSheet, Animated } from 'react-native'
import Image from 'react-native-fast-image'
import PagerView, { PagerViewOnPageScrollEventData } from 'react-native-pager-view'
import { ScalingDot } from 'react-native-animated-pagination-dots'
import min from 'lodash/min'
import map from 'lodash/map'

import { fullImageUrl } from '../../../../services/helper'
import theme from '../../../../theme'
import UserHeader from '../userHeader'
import Footer from '../footer'
import { FeedBoxProps } from './types'
import { ContentView, PaperImage, BlurBackground, DotsContainerView, styles } from './styles'

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

const FeedBox: React.FC<FeedBoxProps> = ({ feed, showHeader, showFooter }) => {
  const width = theme.sizes.width
  const maxHeightRatio = min(map(feed.Photos, photo => photo.width / photo.height)) || 1
  const viewWidth = theme.sizes.width
  const heightRatio = width / maxHeightRatio
  const viewHeight = heightRatio > viewWidth ? viewWidth : heightRatio

  const ref = React.useRef<PagerView>(null)
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current
  const inputRange = [0, feed.Photos.length]
  const scrollX = Animated.add(scrollOffsetAnimatedValue, positionAnimatedValue).interpolate({
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
    return map(feed.Photos, photo => {
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

  const stylesPagerView = StyleSheet.create({
    PagerView: {
      width: viewWidth,
      height: viewHeight,
    },
  })

  return (
    <>
      {showHeader && (
        <UserHeader
          userName={feed.Profile.username}
          url={feed.Profile?.avatar}
          dimensions={dimentions()}
          date={feed.createdAt}
          profileId={feed.profileId}
        />
      )}
      <AnimatedPagerView
        initialPage={0}
        ref={ref}
        style={stylesPagerView.PagerView}
        onPageScroll={onPageScroll}
      >
        {renderImages()}
      </AnimatedPagerView>
      {feed.Photos.length > 1 && (
        <DotsContainerView>
          <ScalingDot
            data={feed.Photos}
            //@ts-ignore
            scrollX={scrollX}
            containerStyle={styles.containerStyle}
            inActiveDotColor={theme.colors.text}
            activeDotColor={theme.colors.text}
            dotStyle={styles.dot}
          />
        </DotsContainerView>
      )}
      {showFooter && (
        <Footer
          likes={feed._count.LikePost}
          comments={feed._count.Comment}
          description={feed.description}
          username={feed.Profile.username}
        />
      )}
    </>
  )
}
export default FeedBox
