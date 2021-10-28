import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import Sample from './sample'
import Login from './view/login'

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  )
}

export default App
