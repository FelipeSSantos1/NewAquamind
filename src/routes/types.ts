import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import {
  NavigatorScreenParams,
  CompositeScreenProps,
} from '@react-navigation/native'

import { TankState } from '../store/tank/types'

type RootStackParamList = ParamListMainStack &
  ParamListAuthStack &
  ParamListFeedStack &
  ParamListTankStack &
  ParamListTabStack

export type ParamListMainStack = {
  Auth: NavigatorScreenParams<ParamListAuthStack>
  Tabs: NavigatorScreenParams<ParamListTabStack>
}
export type ParamListTabStack = {
  FeedTab: NavigatorScreenParams<ParamListFeedStack>
  TankTab: NavigatorScreenParams<ParamListTankStack>
}
export type ParamListGeneralStack = {
  Profile: undefined
  PostDetail: {
    postId?: number
    commentId?: number
  }
}
export type ParamListAuthStack = {
  Login: undefined
  CreateAccount: undefined
  ForgotPassword: undefined
}
export type ParamListFeedStack = ParamListGeneralStack & {
  Feed: undefined
  Comment: { postId: number }
  CreatePost: {
    photo: {
      uri: string
      width: number
      height: number
    }
  }
  TankDetail: {
    tank?: TankState
    tankId: number
  }
}
export type ParamListTankStack = ParamListGeneralStack & {
  Tank: {
    refresh: string
  }
  AddEditTank: {
    tank?: TankState
    fertilizers?: {
      id: number
      name: string
      dose: string
      avatar: string | null
    }
    plants?: {
      id: number
      name: string
      avatar: string | null
    }
  }
  TankDetail: {
    tank?: TankState
    tankId: number
  }
  FertilizerList: undefined
  PlantList: undefined
}
// Root ************************************************************************
export type NavPropsAuth = NativeStackScreenProps<ParamListMainStack, 'Auth'>
export type NavPropsTabs = NativeStackScreenProps<ParamListMainStack, 'Tabs'>
// Auth ************************************************************************
export type NavPropsLogin = CompositeScreenProps<
  NativeStackScreenProps<ParamListAuthStack, 'Login'>,
  NativeStackScreenProps<ParamListMainStack>
>
export type NavPropsCreateAccount = CompositeScreenProps<
  NativeStackScreenProps<ParamListAuthStack, 'CreateAccount'>,
  NativeStackScreenProps<ParamListMainStack>
>
export type NavPropsForgotPassword = CompositeScreenProps<
  NativeStackScreenProps<ParamListAuthStack, 'ForgotPassword'>,
  NativeStackScreenProps<ParamListMainStack>
>
// Tabs ************************************************************************
export type NavPropsFeedTab = CompositeScreenProps<
  BottomTabScreenProps<ParamListTabStack, 'FeedTab'>,
  NativeStackScreenProps<ParamListMainStack>
>
export type NavPropsTankTab = CompositeScreenProps<
  BottomTabScreenProps<ParamListTabStack, 'TankTab'>,
  NativeStackScreenProps<ParamListMainStack>
>
// Feed Tab ********************************************************************
export type NavPropsFeed = CompositeScreenProps<
  NativeStackScreenProps<ParamListFeedStack, 'Feed'>,
  CompositeScreenProps<
    BottomTabScreenProps<ParamListTabStack, 'FeedTab'>,
    NativeStackScreenProps<ParamListMainStack>
  >
>
export type NavPropsCreatePost = CompositeScreenProps<
  NativeStackScreenProps<ParamListFeedStack, 'CreatePost'>,
  CompositeScreenProps<
    BottomTabScreenProps<ParamListTabStack, 'FeedTab'>,
    NativeStackScreenProps<ParamListMainStack>
  >
>
export type NavPropsComment = CompositeScreenProps<
  NativeStackScreenProps<ParamListFeedStack, 'Comment'>,
  CompositeScreenProps<
    BottomTabScreenProps<ParamListTabStack, 'FeedTab'>,
    NativeStackScreenProps<ParamListMainStack>
  >
>
export type NavPropsTankDetail = CompositeScreenProps<
  NativeStackScreenProps<ParamListFeedStack, 'TankDetail'>,
  CompositeScreenProps<
    BottomTabScreenProps<ParamListTabStack, 'FeedTab'>,
    NativeStackScreenProps<ParamListMainStack>
  >
>
// Tank Tab ********************************************************************
export type NavPropsTank = CompositeScreenProps<
  NativeStackScreenProps<ParamListTankStack, 'Tank'>,
  CompositeScreenProps<
    BottomTabScreenProps<ParamListTabStack, 'TankTab'>,
    NativeStackScreenProps<ParamListMainStack>
  >
>
export type NavPropsAddEditTank = CompositeScreenProps<
  NativeStackScreenProps<ParamListTankStack, 'AddEditTank'>,
  CompositeScreenProps<
    BottomTabScreenProps<ParamListTabStack, 'TankTab'>,
    NativeStackScreenProps<ParamListMainStack>
  >
>
export type NavPropsFertilizerList = CompositeScreenProps<
  NativeStackScreenProps<ParamListTankStack, 'FertilizerList'>,
  CompositeScreenProps<
    BottomTabScreenProps<ParamListTabStack, 'TankTab'>,
    NativeStackScreenProps<ParamListMainStack>
  >
>
export type NavPropsPlantList = CompositeScreenProps<
  NativeStackScreenProps<ParamListTankStack, 'PlantList'>,
  CompositeScreenProps<
    BottomTabScreenProps<ParamListTabStack, 'TankTab'>,
    NativeStackScreenProps<ParamListMainStack>
  >
>
// General *********************************************************************
export type NavPropsProfile = NativeStackScreenProps<
  ParamListGeneralStack,
  'Profile'
>
export type NavPropsPostDetail = NativeStackScreenProps<
  ParamListGeneralStack,
  'PostDetail'
>

// Global **********************************************************************
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
