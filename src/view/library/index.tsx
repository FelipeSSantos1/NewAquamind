import React from 'react'
import { useQueryClient } from 'react-query'

import { NavPropsLib } from '../../routes/types'
import * as AlgaeAPI from '../../API/algae'
import * as PlantAPI from '../../API/plant'
import * as StoneAPI from '../../API/stone'
import {
  Container,
  PaperRedText,
  PaperContainer,
  RowView,
  Image,
  PaperTitle,
  PaperTouchableRipple,
} from './styles'

const Library: React.FC<NavPropsLib> = ({ navigation }) => {
  // START - pre fetching datas ******************************************************
  const queryClient = useQueryClient()
  queryClient.prefetchQuery('getAlgaes', AlgaeAPI.getAll, {
    staleTime: 60000 * 60 * 24,
    cacheTime: 60000 * 60 * 24,
  })
  queryClient.prefetchQuery('getPlants', PlantAPI.getAll, {
    staleTime: 60000 * 60 * 24,
    cacheTime: 60000 * 60 * 24,
  })
  queryClient.prefetchQuery('getStones', StoneAPI.getAll, {
    staleTime: 60000 * 60 * 24,
    cacheTime: 60000 * 60 * 24,
  })
  // END - pre fetching datas ******************************************************
  return (
    <Container>
      <RowView>
        <PaperTouchableRipple onPress={() => navigation.navigate('LibPlants')}>
          <PaperContainer>
            <Image source={require('../../assets/icons/libPlants.png')} />
            <PaperTitle>Plant</PaperTitle>
          </PaperContainer>
        </PaperTouchableRipple>
        <PaperTouchableRipple>
          <PaperContainer>
            <Image source={require('../../assets/icons/root.png')} />
            <PaperTitle>Wood</PaperTitle>
            <PaperRedText>coming soon</PaperRedText>
          </PaperContainer>
        </PaperTouchableRipple>
      </RowView>
      <RowView>
        <PaperTouchableRipple onPress={() => navigation.navigate('LibStone')}>
          <PaperContainer>
            <Image source={require('../../assets/icons/stone.png')} />
            <PaperTitle>Stone</PaperTitle>
          </PaperContainer>
        </PaperTouchableRipple>
        <PaperTouchableRipple onPress={() => navigation.navigate('LibAlgae')}>
          <PaperContainer>
            <Image source={require('../../assets/icons/algae.png')} />
            <PaperTitle>Algae</PaperTitle>
          </PaperContainer>
        </PaperTouchableRipple>
      </RowView>
      <RowView>
        <PaperTouchableRipple>
          <PaperContainer>
            <Image source={require('../../assets/Avatar.png')} />
            <PaperTitle>Fish</PaperTitle>
            <PaperRedText>coming soon</PaperRedText>
          </PaperContainer>
        </PaperTouchableRipple>
      </RowView>
    </Container>
  )
}

export default Library
