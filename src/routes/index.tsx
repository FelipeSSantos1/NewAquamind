import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { RootState } from '../store/rootReducer'
import Login from '../view/login'
import CreateAccount from '../view/createAccount'
import ForgotPassword from '../view/forgotPassword'
import FeedView from '../view/feed'
import TankView from '../view/tank'
import {
  ParamListRootStack,
  ParamListTabStack,
  ParamListAuthStack,
  ParamListFeedStack,
  ParamListTankStack,
} from './types'
import { useSelector } from 'react-redux'

const RootStack = createNativeStackNavigator<ParamListRootStack>()
const AuthStack = createNativeStackNavigator<ParamListAuthStack>()
const FeedStack = createNativeStackNavigator<ParamListFeedStack>()
const TankStack = createNativeStackNavigator<ParamListTankStack>()
const Tab = createBottomTabNavigator<ParamListTabStack>()

const Auth: React.FC = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Login"
  >
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="CreateAccount" component={CreateAccount} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
  </AuthStack.Navigator>
)
const Feed: React.FC = () => (
  <FeedStack.Navigator initialRouteName="Feed">
    <FeedStack.Screen name="Feed" component={FeedView} />
  </FeedStack.Navigator>
)
const Tank: React.FC = () => (
  <TankStack.Navigator initialRouteName="Tank">
    <TankStack.Screen name="Tank" component={TankView} />
  </TankStack.Navigator>
)

const Tabs: React.FC = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="FeedTab"
  >
    <Tab.Screen name="FeedTab" component={Feed} />
    <Tab.Screen name="TankTab" component={Tank} />
  </Tab.Navigator>
)

const Routes: React.FC = () => {
  const { user } = useSelector((state: RootState) => state)

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={user.id ? 'Tabs' : 'Auth'}
    >
      <RootStack.Screen name="Auth" component={Auth} />
      <RootStack.Screen name="Tabs" component={Tabs} />
    </RootStack.Navigator>
  )
}

export default Routes
