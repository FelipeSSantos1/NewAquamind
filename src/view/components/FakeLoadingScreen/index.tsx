import React from 'react'

import { MainView, Spinner } from './styles'

const FakeLoadingScreen: React.FC = () => (
  <MainView>
    <Spinner size={30} />
  </MainView>
)

export default FakeLoadingScreen
