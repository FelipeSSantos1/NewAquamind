import React from 'react'

import { NavPropsLib } from '../../routes/types'
import {
  Container,
  PaperRedText,
  PaperContainer,
  RowView,
  Image,
  PaperTitle,
} from './styles'

const Library: React.FC<NavPropsLib> = () => {
  return (
    <Container>
      <RowView>
        <PaperContainer>
          <Image source={require('../../assets/icons/libPlants.png')} />
          <PaperTitle>Plants</PaperTitle>
        </PaperContainer>
        <PaperContainer>
          <Image source={require('../../assets/icons/root.png')} />
          <PaperTitle>Wood</PaperTitle>
          <PaperRedText>coming soon</PaperRedText>
        </PaperContainer>
      </RowView>
      <RowView>
        <PaperContainer>
          <Image source={require('../../assets/icons/stone.png')} />
          <PaperTitle>Rocks</PaperTitle>
          <PaperRedText>coming soon</PaperRedText>
        </PaperContainer>
        <PaperContainer>
          <Image source={require('../../assets/icons/algae.png')} />
          <PaperTitle>Algae</PaperTitle>
          <PaperRedText>coming soon</PaperRedText>
        </PaperContainer>
      </RowView>
      <RowView>
        <PaperContainer>
          <Image source={require('../../assets/Avatar.png')} />
          <PaperTitle>Fish</PaperTitle>
          <PaperRedText>coming soon</PaperRedText>
        </PaperContainer>
      </RowView>
    </Container>
  )
}

export default Library
