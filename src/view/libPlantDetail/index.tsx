import React from 'react'

import { NavPropsLibPlantDetail } from '../../routes/types'
import { Container, PaperText } from './styles'

const LibPlantDetail: React.FC<NavPropsLibPlantDetail> = () => {
  return (
    <Container>
      <PaperText>Plant Detail</PaperText>
    </Container>
  )
}

export default LibPlantDetail
