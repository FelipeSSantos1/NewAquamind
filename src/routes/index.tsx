import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../view/login'
import CreateAccount from '../view/createAccount'
import { RootStackParamList } from './types'

const Stack = createNativeStackNavigator<RootStackParamList>()
const Auth: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Login"
  >
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="CreateAccount" component={CreateAccount} />
  </Stack.Navigator>
)

const Routes: React.FC = () => {
  return <Auth />
}

export default Routes
