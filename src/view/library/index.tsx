import React from 'react'

import { NavPropsLib } from '../../routes/types'
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
  return (
    <Container>
      <RowView>
        <PaperTouchableRipple onPress={() => navigation.navigate('LibPlants')}>
          <PaperContainer>
            <Image source={require('../../assets/icons/libPlants.png')} />
            <PaperTitle>Plants</PaperTitle>
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
        <PaperTouchableRipple>
          <PaperContainer>
            <Image source={require('../../assets/icons/stone.png')} />
            <PaperTitle>Rocks</PaperTitle>
            <PaperRedText>coming soon</PaperRedText>
          </PaperContainer>
        </PaperTouchableRipple>
        <PaperTouchableRipple>
          <PaperContainer>
            <Image source={require('../../assets/icons/algae.png')} />
            <PaperTitle>Algae</PaperTitle>
            <PaperRedText>coming soon</PaperRedText>
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
