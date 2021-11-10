import React from 'react'

import { ImageBoxProps } from './types'
import { ImageBox, ImageBoxImage } from './styles'
import { fullImageUrl } from '../../../services/helper'

const imageBox: React.FC<ImageBoxProps> = ({ imageUrl }) => {
  return (
    <ImageBox>
      <ImageBoxImage source={fullImageUrl(imageUrl)} resizeMode="cover" />
    </ImageBox>
  )
}

export default imageBox
