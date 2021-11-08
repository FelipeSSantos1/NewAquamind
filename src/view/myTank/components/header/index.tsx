import React from 'react'

import { NavPropsTank } from 'routes/types'
import { RowView, HeaderView, PaperText, PaperIconButton } from './styles'

const Header: React.FC<NavPropsTank> = ({ navigation }) => {
  return (
    <HeaderView
      onPress={() => navigation.navigate('AddEditTank', {})}
      hasTVPreferredFocus={undefined}
      tvParallaxProperties={undefined}
    >
      <RowView>
        <PaperIconButton
          icon="plus"
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
        />
        <PaperText>New Tank</PaperText>
      </RowView>
    </HeaderView>
  )
}

export default Header
