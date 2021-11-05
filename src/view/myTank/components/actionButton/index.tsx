import React from 'react'

import theme from '../../../../theme'
import { ActionButtonProps } from './types'
import { StyledActionButton, Icon, ActionButtonText } from './styles'
const ActionButton: React.FC<ActionButtonProps> = ({
  onPress,
  bkgColor,
  icon,
  label,
  disabled = false,
}) => {
  return (
    <StyledActionButton
      disabled={disabled}
      onPress={() => onPress()}
      bkgColor={bkgColor}
      rippleColor={theme.colors.onSurface}
      hasTVPreferredFocus={undefined}
      tvParallaxProperties={undefined}
    >
      <>
        <Icon
          icon={icon}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
        />
        <ActionButtonText>{label}</ActionButtonText>
      </>
    </StyledActionButton>
  )
}

export default ActionButton
