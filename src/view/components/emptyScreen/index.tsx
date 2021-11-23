import React from 'react'

import { EmptyScreenProps } from './types'
import { MainView, PaperText, PaperIconButton } from './styles'

const FakeLoadingScreen: React.FC<EmptyScreenProps> = ({
  text,
  onPress,
  icon,
}) => (
  <MainView onPress={() => onPress() || null}>
    <>
      {icon && <PaperIconButton icon={icon} />}
      {text && <PaperText>{text}</PaperText>}
    </>
  </MainView>
)

export default FakeLoadingScreen
