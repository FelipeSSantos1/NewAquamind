import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { TankState } from '../store/tank/types'

export type RootStackParamList = {
  Auth: {
    Login: undefined
    CreateAccount: undefined
    ForgotPassword: undefined
  }
  Tabs: {
    FeedTab: {
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
      Profile: undefined
      PostDetail: {
        postId?: number
        commentId?: number
      }
    }
    TankTab: {
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
      Profile: undefined
      PostDetail: {
        postId?: number
        commentId?: number
      }
    }
  }
}

// Root ************************************************************************
export type NavPropsAuth = NativeStackScreenProps<RootStackParamList, 'Auth'>
export type NavPropsTabs = NativeStackScreenProps<RootStackParamList, 'Tabs'>
// Auth ************************************************************************
export type NavPropsLogin = NativeStackScreenProps<
  RootStackParamList['Auth'],
  'Login'
>
export type NavPropsCreateAccount = NativeStackScreenProps<
  RootStackParamList['Auth'],
  'CreateAccount'
>
export type NavPropsForgotPassword = NativeStackScreenProps<
  RootStackParamList['Auth'],
  'ForgotPassword'
>
// Tabs ************************************************************************
export type NavPropsFeedTab = NativeStackScreenProps<
  RootStackParamList['Tabs'],
  'FeedTab'
>
export type NavPropsTankTab = NativeStackScreenProps<
  RootStackParamList['Tabs'],
  'TankTab'
>
// Feed Tab ********************************************************************
export type NavPropsFeed = NativeStackScreenProps<
  RootStackParamList['Tabs']['FeedTab'],
  'Feed'
>
export type NavPropsCreatePost = NativeStackScreenProps<
  RootStackParamList['Tabs']['FeedTab'],
  'CreatePost'
>
export type NavPropsComment = NativeStackScreenProps<
  RootStackParamList['Tabs']['FeedTab'],
  'Comment'
>
export type NavPropsTankDetail = NativeStackScreenProps<
  RootStackParamList['Tabs']['FeedTab'],
  'TankDetail'
>
// Tank Tab ********************************************************************
export type NavPropsTank = NativeStackScreenProps<
  RootStackParamList['Tabs']['TankTab'],
  'Tank'
>
export type NavPropsAddEditTank = NativeStackScreenProps<
  RootStackParamList['Tabs']['TankTab'],
  'AddEditTank'
>
export type NavPropsFertilizerList = NativeStackScreenProps<
  RootStackParamList['Tabs']['TankTab'],
  'FertilizerList'
>
export type NavPropsPlantList = NativeStackScreenProps<
  RootStackParamList['Tabs']['TankTab'],
  'PlantList'
>
// General *********************************************************************
export type NavPropsProfile = NativeStackScreenProps<
  RootStackParamList['Tabs']['TankTab'] | RootStackParamList['Tabs']['FeedTab'],
  'Profile'
>
export type NavPropsPostDetail = NativeStackScreenProps<
  RootStackParamList['Tabs']['TankTab'] | RootStackParamList['Tabs']['FeedTab'],
  'PostDetail'
>

// Global **********************************************************************
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
