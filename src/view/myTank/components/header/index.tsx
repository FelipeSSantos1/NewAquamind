import React from 'react'

import { NavPropsTank } from 'routes/types'
import theme from '../../../../theme'
import { RowView, HeaderView, PaperText, PaperIconButton } from './styles'

const Header: React.FC<NavPropsTank> = ({ navigation }) => {
  return (
    <HeaderView
      onPress={() => navigation.navigate('AddEditTank', {})}
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
        <PaperText>New Tank</PaperText>
      </RowView>
    </HeaderView>
  )
}

export default Header
