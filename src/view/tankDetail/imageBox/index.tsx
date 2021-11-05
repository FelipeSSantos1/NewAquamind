import React from 'react'

import { ImageBoxProps } from './types'
import { ImageBox, ImageBoxImage } from './styles'

const imageBox: React.FC<ImageBoxProps> = ({ imageUrl }) => {
  return (
    <ImageBox>
      <ImageBoxImage source={{ uri: imageUrl }} resizeMode="cover" />
    </ImageBox>
  )
}

export default imageBox
