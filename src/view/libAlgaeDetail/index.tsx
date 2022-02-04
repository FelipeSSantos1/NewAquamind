import React from 'react'
import find from 'lodash/find'
import min from 'lodash/min'
import map from 'lodash/map'
import Image from 'react-native-fast-image'
import { Animated, StyleSheet, View } from 'react-native'
import Pinchable from 'react-native-pinchable'
import PagerView, {
  PagerViewOnPageScrollEventData,
} from 'react-native-pager-view'
import { ScalingDot } from 'react-native-animated-pagination-dots'

import { NavPropsLibAlgaeDetail } from '../../routes/types'
import theme from '../../theme'
import {
  Container,
  PaperText,
  PaperTitle,
  CenterView,
  DotsContainerView,
  styles,
  ContentView,
  PaperImage,
  BlurBackground,
  TextContainer,
  PaperSource,
} from './styles'
import { fullImageUrl } from '../../services/helper'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

const LibAlgaeDetail: React.FC<NavPropsLibAlgaeDetail> = ({ route }) => {
  const ref = React.useRef<PagerView>(null)
  const { algae } = useSelector((state: RootState) => state)
  const selectedAlgae = find(algae, { id: route.params.algaeId })

  const width = theme.sizes.width
  const maxHeightRatio =
    min(
      map(
        selectedAlgae?.Photos,
        photo =>
          (photo.width ? photo.width : 1) / (photo.height ? photo.height : 1)
      )
    ) || 1
  const viewWidth = theme.sizes.width
  const heightRatio = width / maxHeightRatio
  const viewHeight = heightRatio > viewWidth ? viewWidth : heightRatio

  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current
  const inputRange = [0, selectedAlgae ? selectedAlgae.Photos.length : 0]
  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, (selectedAlgae ? selectedAlgae.Photos.length : 0) * width],
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

  const renderImages = () => {
    return map(selectedAlgae?.Photos, photo => {
      const localWidth = photo.width || 1
      const localHeight = photo.height || 1

      const imageHeight = width * (localHeight / localWidth)
      const imageWidth = width * (localWidth / localHeight)
      const landscape = localWidth > localHeight
      return (
        <ContentView key={photo.id}>
          <PaperImage resizeMode="cover" source={fullImageUrl(photo.url)} />
          <BlurBackground intensity={100}>
            <Pinchable>
              <Image
                source={fullImageUrl(photo.url)}
                style={{
                  width: landscape ? width : imageWidth,
                  height: landscape ? imageHeight : width,
                }}
              />
            </Pinchable>
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
    <Container showsVerticalScrollIndicator={false}>
      <View>
        <AnimatedPagerView
          initialPage={0}
          ref={ref}
          style={stylesPagerView.PagerView}
          onPageScroll={onPageScroll}
        >
          {renderImages()}
        </AnimatedPagerView>
        {selectedAlgae && selectedAlgae.Photos.length > 1 && (
          <DotsContainerView>
            <ScalingDot
              data={selectedAlgae.Photos}
              //@ts-ignore
              scrollX={scrollX}
              containerStyle={styles.containerStyle}
              inActiveDotColor={theme.colors.text}
              activeDotColor={theme.colors.text}
              dotStyle={styles.dot}
            />
          </DotsContainerView>
        )}
      </View>
      <TextContainer>
        <CenterView>
          <PaperTitle>{selectedAlgae?.name}</PaperTitle>
        </CenterView>
        <PaperText>{selectedAlgae?.description}</PaperText>
        <PaperTitle>Common Cause</PaperTitle>
        <PaperText>{selectedAlgae?.cause}</PaperText>
        <PaperTitle>Treatment</PaperTitle>
        <PaperText>{selectedAlgae?.treatment}</PaperText>
        <PaperSource>source: {selectedAlgae?.source}</PaperSource>
      </TextContainer>
    </Container>
  )
}

export default LibAlgaeDetail
