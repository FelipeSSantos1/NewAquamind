import React from 'react'
import { View } from 'react-native'
import Pinchable from 'react-native-pinchable'
import { useQuery } from 'react-query'

import * as API from '../../API/fish'
import { NavPropsLibFishDetail } from '../../routes/types'
import { fullImageUrl } from '../../services/helper'
import FakeLoadingScreen from '../components/fakeLoadingScreen'
import {
  Container,
  PaperText,
  PaperTitle,
  PaperImage,
  TextContainer,
  PaperSource,
  ScientificName,
  CommonName,
} from './styles'

const LibFishDetail: React.FC<NavPropsLibFishDetail> = ({ route }) => {
  const { data: selectedFish, isFetching } = useQuery(
    `getFish${route.params.fishId}`,
    () => API.getByID(route.params.fishId)
  )
  if (isFetching || !selectedFish || 'statusCode' in selectedFish) {
    return <FakeLoadingScreen />
  }

  return (
    <Container showsVerticalScrollIndicator={false}>
      <View>
        <Pinchable>
          <PaperImage source={fullImageUrl(selectedFish.thumb)} />
        </Pinchable>
      </View>
      <TextContainer>
        {!!selectedFish.commonName && (
          <CommonName>{selectedFish.commonName}</CommonName>
        )}
        {!!selectedFish.scientificName && (
          <ScientificName>({selectedFish.scientificName})</ScientificName>
        )}
        {!!selectedFish.description && (
          <PaperText>{selectedFish.description}</PaperText>
        )}
        {!!selectedFish.origin && (
          <>
            <PaperTitle>Origin</PaperTitle>
            <PaperText>{selectedFish.origin}</PaperText>
          </>
        )}
        {!!selectedFish.diet && (
          <>
            <PaperTitle>Diet</PaperTitle>
            <PaperText>{selectedFish.diet}</PaperText>
          </>
        )}
        {!!selectedFish.size && (
          <>
            <PaperTitle>Adult Size</PaperTitle>
            <PaperText>{selectedFish.size}cm</PaperText>
          </>
        )}
        {!!selectedFish.tankSize && (
          <>
            <PaperTitle>Recommended Tank Size</PaperTitle>
            <PaperText>{selectedFish.tankSize}L</PaperText>
          </>
        )}
        {!!selectedFish.behaviour && (
          <>
            <PaperTitle>Compatibility</PaperTitle>
            <PaperText>{selectedFish.behaviour}</PaperText>
          </>
        )}
        {!!selectedFish.ph && (
          <>
            <PaperTitle>Ph</PaperTitle>
            <PaperText>{selectedFish.ph}</PaperText>
          </>
        )}
        {!!selectedFish.temperature && (
          <>
            <PaperTitle>Temperature</PaperTitle>
            <PaperText>{selectedFish.temperature}°C</PaperText>
          </>
        )}
        <PaperSource>source: {selectedFish.source}</PaperSource>
      </TextContainer>
    </Container>
  )
}

export default LibFishDetail
