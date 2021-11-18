import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector, useDispatch } from 'react-redux'
import * as Haptics from 'expo-haptics'
import { IconButton } from 'react-native-paper'

import PostDetail from '../view/postDetail'
import { RootState } from '../store/rootReducer'
import Login from '../view/login'
import CreateAccount from '../view/createAccount'
import ForgotPassword from '../view/forgotPassword'
import FeedView from '../view/feed'
import CommentView from '../view/comment'
import TankView from '../view/myTank'
import ContactUsView from '../view/contactUs'
import CreatePostView from '../view/createPost'
import TankDetailView from '../view/tankDetail'
import AddEditTankView from '../view/addEditTank'
import AddFertilizerView from '../view/addFertilizer'
import AddPlantView from '../view/addPlant'
import ProfileView from '../view/profile'
import ConfigRTK from '../store/config'
import theme from '../theme'
import {
  ParamListAuthStack,
  ParamListFeedStack,
  ParamListTankStack,
  ParamListGeneralStack,
  ParamListTabStack,
  ParamListMainStack,
} from './types'

const RootStack = createNativeStackNavigator<ParamListMainStack>()
const AuthStack = createNativeStackNavigator<ParamListAuthStack>()
const FeedStack = createNativeStackNavigator<ParamListFeedStack>()
const TankStack = createNativeStackNavigator<ParamListTankStack>()
const GeneralStack = createNativeStackNavigator<ParamListGeneralStack>()
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
const General = () => [
  <GeneralStack.Screen
    key="GeneralProfile"
    name="Profile"
    component={ProfileView}
    options={{
      title: 'Profile',
    }}
  />,
  <GeneralStack.Screen
    key="GeneralPostDetail"
    name="PostDetail"
    component={PostDetail}
    options={{
      title: 'Post Detail',
    }}
  />,
  <GeneralStack.Screen
    key="GeneralContactUs"
    name="ContactUs"
    component={ContactUsView}
    options={{
      title: 'Contact Us',
    }}
  />,
]
const Feed: React.FC = () => {
  const dispatch = useDispatch()

  return (
    <FeedStack.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerTintColor: theme.colors.surface,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <FeedStack.Screen
        name="Feed"
        component={FeedView}
        options={{
          headerRight: () => (
            <IconButton
              icon="menu"
              color={theme.colors.surface}
              onPress={() => {
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success
                )
                dispatch(ConfigRTK.actions.showDrawer(true))
              }}
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}
            />
          ),
        }}
      />
      <FeedStack.Screen
        name="Comment"
        component={CommentView}
        options={{
          title: 'Comments',
        }}
      />
      <FeedStack.Screen
        name="CreatePost"
        component={CreatePostView}
        options={{
          title: 'New Post',
        }}
      />
      <FeedStack.Screen
        name="TankDetail"
        component={TankDetailView}
        options={{
          title: 'Tank Detail',
        }}
      />
      {General()}
    </FeedStack.Navigator>
  )
}
const Tank: React.FC = () => {
  const dispatch = useDispatch()
  return (
    <TankStack.Navigator
      initialRouteName="Tank"
      screenOptions={{
        headerTintColor: theme.colors.surface,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <TankStack.Screen
        name="Tank"
        component={TankView}
        options={{
          title: 'My Tanks',
          headerRight: () => (
            <IconButton
              icon="menu"
              color={theme.colors.surface}
              onPress={() => {
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success
                )
                dispatch(ConfigRTK.actions.showDrawer(true))
              }}
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}
            />
          ),
        }}
        initialParams={{ refresh: '' }}
      />
      <TankStack.Screen
        name="AddEditTank"
        component={AddEditTankView}
        options={{
          title: '',
        }}
      />
      <TankStack.Screen
        name="TankDetail"
        component={TankDetailView}
        options={{
          title: 'Tank Detail',
        }}
      />
      <TankStack.Screen
        name="FertilizerList"
        component={AddFertilizerView}
        options={{
          title: 'Add Fertilizer',
          presentation: 'modal',
        }}
      />
      <TankStack.Screen
        name="PlantList"
        component={AddPlantView}
        options={{
          title: 'Add Plant',
          presentation: 'modal',
        }}
      />
      {General()}
    </TankStack.Navigator>
  )
}

const Tabs: React.FC = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveBackgroundColor: theme.colors.background,
      tabBarInactiveBackgroundColor: theme.colors.background,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: theme.colors.background,
      },
    }}
    initialRouteName="FeedTab"
  >
    <Tab.Screen
      name="FeedTab"
      component={Feed}
      options={{
        tabBarLabel: 'Feed',
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={focused ? 'image-multiple' : 'image-multiple-outline'}
            color={theme.colors.primary}
            size={focused ? 24 : 22}
          />
        ),
      }}
    />
    <Tab.Screen
      name="TankTab"
      component={Tank}
      options={{
        tabBarLabel: 'My Tank',
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={focused ? 'fishbowl' : 'fishbowl-outline'}
            color={theme.colors.primary}
            size={24}
          />
        ),
      }}
    />
  </Tab.Navigator>
)

const Routes: React.FC = () => {
  const { config } = useSelector((state: RootState) => state)
  const { authenticated } = config

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {authenticated ? (
        <RootStack.Screen name="Tabs" component={Tabs} />
      ) : (
        <RootStack.Screen name="Auth" component={Auth} />
      )}
    </RootStack.Navigator>
  )
}

export default Routes
