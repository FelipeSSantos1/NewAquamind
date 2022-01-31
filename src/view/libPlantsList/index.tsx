import React from 'react'

import { NavPropsLibPlants } from '../../routes/types'
import { Container, PaperText } from './styles'

const LibPlantsList: React.FC<NavPropsLibPlants> = () => {
  return (
    <Container>
      <PaperText>Plant List</PaperText>
    </Container>
  )
}

export default LibPlantsList
