import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { TankState } from '../store/tank/types'

export type ParamListRootStack = {
  Auth: ParamListAuthStack
  Tabs: ParamListTabStack
}
export type ParamListTabStack = {
  FeedTab: ParamListFeedStack
  TankTab: ParamListTankStack
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
export type NavPropsAuth = NativeStackScreenProps<ParamListRootStack, 'Auth'>
export type NavPropsTabs = NativeStackScreenProps<ParamListRootStack, 'Tabs'>
// Auth ************************************************************************
export type NavPropsLogin = NativeStackScreenProps<
  ParamListAuthStack & ParamListRootStack,
  'Login'
>
export type NavPropsCreateAccount = NativeStackScreenProps<
  ParamListAuthStack & ParamListRootStack,
  'CreateAccount'
>
export type NavPropsForgotPassword = NativeStackScreenProps<
  ParamListAuthStack & ParamListRootStack,
  'ForgotPassword'
>
// Tabs ************************************************************************
export type NavPropsFeedTab = NativeStackScreenProps<
  ParamListTabStack,
  'FeedTab'
>
export type NavPropsTankTab = NativeStackScreenProps<
  ParamListTabStack,
  'TankTab'
>
// Feed Tab ********************************************************************
export type NavPropsFeed = NativeStackScreenProps<ParamListFeedStack, 'Feed'>
export type NavPropsCreatePost = NativeStackScreenProps<
  ParamListFeedStack,
  'CreatePost'
>
export type NavPropsComment = NativeStackScreenProps<
  ParamListFeedStack,
  'Comment'
>
export type NavPropsTankDetail = NativeStackScreenProps<
  ParamListFeedStack,
  'TankDetail'
>
// Tank Tab ********************************************************************
export type NavPropsTank = NativeStackScreenProps<ParamListTankStack, 'Tank'>
export type NavPropsAddEditTank = NativeStackScreenProps<
  ParamListTankStack,
  'AddEditTank'
>
export type NavPropsFertilizerList = NativeStackScreenProps<
  ParamListTankStack,
  'FertilizerList'
>
export type NavPropsPlantList = NativeStackScreenProps<
  ParamListTankStack,
  'PlantList'
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
    interface RootParamList extends ParamListRootStack {}
  }
}
