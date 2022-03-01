import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector, useDispatch } from 'react-redux'
import * as Haptics from 'expo-haptics'
import { IconButton, TouchableRipple } from 'react-native-paper'

import PostDetail from '../view/postDetail'
import { RootState } from '../store/rootReducer'
import Login from '../view/login'
import CreateAccount from '../view/createAccount'
import ForgotPassword from '../view/forgotPassword'
import FeedView from '../view/feed'
import CommentView from '../view/comment'
import TankView from '../view/myTank'
import ContactUsView from '../view/contactUs'
import NotificationView from '../view/notification'
import CreatePostView from '../view/createPost'
import TankDetailView from '../view/tankDetail'
import AddEditTankView from '../view/addEditTank'
import ValidateEmailView from '../view/validateEmail'
import ResetPasswordView from '../view/resetPassword'
import AddFertilizerView from '../view/addFertilizer'
import AddPlantView from '../view/addPlant'
import ProfileView from '../view/profile'
import LibraryView from '../view/library'
import LibPlantsView from '../view/libPlantsList'
import LibPlantDetailView from '../view/libPlantDetail'
import LibAlgaeView from '../view/libAlgaeList'
import LibAlgaeDetailView from '../view/libAlgaeDetail'
import LibFishView from '../view/libFishList'
import LibFishDetailView from '../view/libFishDetail'
import LibStoneView from '../view/libStoneList'
import LibStoneDetailView from '../view/libStoneDetail'
import ConfigRTK from '../store/config'
import theme from '../theme'
import {
  ParamListAuthStack,
  ParamListFeedStack,
  ParamListTankStack,
  ParamListGeneralStack,
  ParamListTabStack,
  ParamListMainStack,
  ParamLibraryStack,
} from './types'

const RootStack = createNativeStackNavigator<ParamListMainStack>()
const AuthStack = createNativeStackNavigator<ParamListAuthStack>()
const FeedStack = createNativeStackNavigator<ParamListFeedStack>()
const TankStack = createNativeStackNavigator<ParamListTankStack>()
const LibStack = createNativeStackNavigator<ParamLibraryStack>()
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
    <AuthStack.Screen name="ValidateEmail" component={ValidateEmailView} />
    <AuthStack.Screen name="ResetPassword" component={ResetPasswordView} />
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
    options={({ navigation }) => ({
      title: 'Post Detail',
      headerLeft: () => (
        <TouchableRipple
          onPress={() => {
            navigation.pop()
          }}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            color={theme.colors.surface}
            size={35}
          />
        </TouchableRipple>
      ),
    })}
  />,
  <GeneralStack.Screen
    key="GeneralContactUs"
    name="ContactUs"
    component={ContactUsView}
    options={{
      title: 'Contact Us',
    }}
  />,
  <GeneralStack.Screen
    key="GeneralNotification"
    name="Notification"
    component={NotificationView}
    options={{
      title: 'Notification Center',
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
const Lib: React.FC = () => {
  const dispatch = useDispatch()
  return (
    <LibStack.Navigator
      initialRouteName="Lib"
      screenOptions={{
        headerTintColor: theme.colors.surface,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <LibStack.Screen
        name="Lib"
        component={LibraryView}
        options={{
          title: 'Library',
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
            />
          ),
        }}
      />
      <LibStack.Screen
        name="LibPlants"
        component={LibPlantsView}
        options={{
          title: 'Plants',
        }}
      />
      <LibStack.Screen
        name="LibPlantDetail"
        component={LibPlantDetailView}
        options={{
          title: 'Plant Detail',
        }}
      />
      <LibStack.Screen
        name="LibAlgae"
        component={LibAlgaeView}
        options={{
          title: 'Algae',
        }}
      />
      <LibStack.Screen
        name="LibAlgaeDetail"
        component={LibAlgaeDetailView}
        options={{
          title: 'Algae Detail',
        }}
      />
      <LibStack.Screen
        name="LibStone"
        component={LibStoneView}
        options={{
          title: 'Stone',
        }}
      />
      <LibStack.Screen
        name="LibStoneDetail"
        component={LibStoneDetailView}
        options={{
          title: 'Stone Detail',
        }}
      />
      <LibStack.Screen
        name="LibFish"
        component={LibFishView}
        options={{
          title: 'Fish',
        }}
      />
      <LibStack.Screen
        name="LibFishDetail"
        component={LibFishDetailView}
        options={{
          title: 'Fish Detail',
        }}
      />
      {General()}
    </LibStack.Navigator>
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
    <Tab.Screen
      name="LibTab"
      component={Lib}
      options={{
        tabBarLabel: 'Library',
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={focused ? 'school' : 'school-outline'}
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
