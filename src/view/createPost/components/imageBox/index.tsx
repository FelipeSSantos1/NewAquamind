import React from 'react'

import { ImageBoxProps } from './types'
import {
  ImageBox,
  ImageBoxImage,
  PaperIconButton,
  PaperTouchableRipple,
  PaperIconButtonAbsolute,
} from './styles'
import theme from '../../../../theme'

const imageBox: React.FC<ImageBoxProps> = ({ imageUrl, onPress }) => {
  return (
    <ImageBox>
      <PaperTouchableRipple
        onPress={onPress}
        rippleColor={theme.colors.onSurface}
        hasTVPreferredFocus={undefined}
        tvParallaxProperties={undefined}
      >
        {imageUrl ? (
          <>
            <ImageBoxImage source={{ uri: imageUrl }} resizeMode="cover" />
            <PaperIconButtonAbsolute
              icon="delete-circle"
              size={30}
              color={theme.colors.surface}
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}
            />
          </>
        ) : (
          <PaperIconButton
            icon="plus-circle-outline"
            size={30}
            color={theme.colors.surface}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}
          />
        )}
      </PaperTouchableRipple>
    </ImageBox>
  )
}

export default imageBox
