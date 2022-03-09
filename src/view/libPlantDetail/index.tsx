import React from 'react'
import find from 'lodash/find'
import { useSelector } from 'react-redux'

import { NavPropsLibPlantDetail } from '../../routes/types'
import { Container, PaperText, PaperTitle, CenterView, ThumbImage, EmptyView } from './styles'
import { fullImageUrl } from '../../services/helper'
import { RootState } from 'store/rootReducer'

const LibPlantDetail: React.FC<NavPropsLibPlantDetail> = ({ route }) => {
  const { plant } = useSelector((state: RootState) => state)
  const selectedPlant = find(plant, { id: route.params.plantId })

  return (
    <Container showsVerticalScrollIndicator={false}>
      <CenterView>
        <ThumbImage source={fullImageUrl(selectedPlant?.avatar)} resizeMode="contain" />
        <PaperTitle>{selectedPlant?.name}</PaperTitle>
      </CenterView>
      <PaperText>{selectedPlant?.description}</PaperText>
      <EmptyView />
    </Container>
  )
}

export default LibPlantDetail
