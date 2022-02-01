import React from 'react'

import { NavPropsLibPlantDetail } from '../../routes/types'
import Loading from '../components/fakeLoadingScreen'
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

const LibPlantDetail: React.FC<NavPropsLibPlantDetail> = ({
  navigation,
  route,
}) => {
  const [ready, setReady] = React.useState(false)
  const [selectedPlant, setSelectedPlant] = React.useState<PlantDetail>()
  React.useEffect(() => {
    const fetchPlant = async () => {
      const response = await PlantAPI.getById(route.params.plantId)
      if (!response || 'statusCode' in response) {
        navigation.pop()
        return
      }
      setSelectedPlant(response)
      setReady(true)
    }
    fetchPlant()
  }, [navigation, route.params.plantId])

  if (!ready) {
    return <Loading />
  }

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
