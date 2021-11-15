import React from 'react'

import { HeaderSlotProps } from './types'
import { MainView, Label, Value } from './styles'

const HeaderSlot = ({ label, value }: HeaderSlotProps) => {
  return (
    <MainView>
      <Value>{value}</Value>
      <Label>{label}</Label>
    </MainView>
  )
}

export default HeaderSlot
