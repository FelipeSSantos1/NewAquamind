import React from 'react'
import { StyleSheet } from 'react-native'
import Image from 'react-native-fast-image'
import PagerView from 'react-native-pager-view'
import _ from 'lodash'

import { fullImageUrl } from '../../../../services/helper'
import theme from '../../../../theme'
import UserHeader from '../userHeader'
import Footer from '../footer'
import { FeedBoxProps } from './types'
import { ContentView, PaperImage, BlurBackground } from './styles'

const FeedBox: React.FC<FeedBoxProps> = ({ feed, showHeader, showFooter }) => {
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

  const styles = StyleSheet.create({
    pagerView: {
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
      <PagerView style={styles.pagerView} initialPage={0} showPageIndicator>
        {renderImages()}
      </PagerView>
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
