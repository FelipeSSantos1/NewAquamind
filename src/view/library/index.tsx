import React from 'react'

import { NavPropsLib } from '../../routes/types'
import { Container, PaperText } from './styles'

const Library: React.FC<NavPropsLib> = () => {
  return (
    <Container>
      <PaperText>Library</PaperText>
    </Container>
  )
}

export default Library
