import React from 'react'

import { NavPropsLibPlantDetail } from '../../routes/types'
import * as PlantAPI from '../../API/plant'
import { PlantDetail } from '../../API/plant/types'
import {
  Container,
  PaperText,
  PaperTitle,
  CenterView,
  ThumbImage,
  EmptyView,
} from './styles'
import { fullImageUrl } from '../../services/helper'

const LibPlantDetail: React.FC<NavPropsLibPlantDetail> = ({ route }) => {
  const [selectedPlant, setSelectedPlant] = React.useState<PlantDetail>()
  React.useEffect(() => {
    const fetchPlant = async () => {
      const response = await PlantAPI.getById(route.params.plantId)
      if (!response || 'statusCode' in response) {
        return
      }
      setSelectedPlant(response)
    }
    fetchPlant()
  }, [route.params.plantId])

  return (
    <Container showsVerticalScrollIndicator={false}>
      <CenterView>
        <ThumbImage
          source={fullImageUrl(selectedPlant?.avatar)}
          resizeMode="contain"
        />
        <PaperTitle>{selectedPlant?.name}</PaperTitle>
      </CenterView>
      <PaperText>{selectedPlant?.description}</PaperText>
      <EmptyView />
    </Container>
  )
}

export default LibPlantDetail
