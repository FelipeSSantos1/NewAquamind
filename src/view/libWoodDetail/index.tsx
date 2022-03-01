import React from 'react'
import { View } from 'react-native'
import Pinchable from 'react-native-pinchable'
import { useQuery } from 'react-query'

import * as API from '../../API/wood'
import { NavPropsLibWoodDetail } from '../../routes/types'
import { fullImageUrl } from '../../services/helper'
import FakeLoadingScreen from '../components/fakeLoadingScreen'
import {
  Container,
  PaperText,
  PaperImage,
  TextContainer,
  PaperSource,
  CommonName,
} from './styles'

const LibFishDetail: React.FC<NavPropsLibWoodDetail> = ({ route }) => {
  const { data: selectedWood, isFetching } = useQuery(
    `getWood${route.params.woodId}`,
    () => API.getByID(route.params.woodId)
  )
  if (isFetching || !selectedWood || 'statusCode' in selectedWood) {
    return <FakeLoadingScreen />
  }

  return (
    <Container showsVerticalScrollIndicator={false}>
      <View>
        <Pinchable>
          <PaperImage source={fullImageUrl(selectedWood.thumb)} />
        </Pinchable>
      </View>
      <TextContainer>
        {!!selectedWood.name && <CommonName>{selectedWood.name}</CommonName>}
        {!!selectedWood.description && (
          <PaperText>{selectedWood.description}</PaperText>
        )}
        <PaperSource>source: {selectedWood.source}</PaperSource>
      </TextContainer>
    </Container>
  )
}

export default LibFishDetail
