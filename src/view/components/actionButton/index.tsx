import React from 'react'

import theme from '../../../theme'
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
    >
      <>
        <Icon icon={icon} />
        <ActionButtonText>{label}</ActionButtonText>
      </>
    </StyledActionButton>
  )
}

export default ActionButton
