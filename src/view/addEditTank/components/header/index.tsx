import React from 'react'

import { HeaderProps } from './types'
import theme from '../../../../theme'
import { RowView, HeaderView, PaperText, PaperIconButton } from './styles'

const Header: React.FC<HeaderProps> = ({ title, onPress }) => {
  return (
    <HeaderView
      onPress={() => onPress()}
      underlayColor={theme.colors.text}
      hasTVPreferredFocus={undefined}
      tvParallaxProperties={undefined}
    >
      <RowView>
        <PaperIconButton
          icon="plus"
          color={theme.colors.surface}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
        />
        <PaperText>{title}</PaperText>
      </RowView>
    </HeaderView>
  )
}

export default Header
