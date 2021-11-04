import { NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type ParamListRootStack = {
  Auth?: NavigatorScreenParams<ParamListAuthStack>
  Tabs?: NavigatorScreenParams<ParamListTabStack>
}
export type ParamListTabStack = {
  FeedTab?: NavigatorScreenParams<ParamListFeedStack>
  TankTab?: NavigatorScreenParams<ParamListTankStack>
}
export type ParamListAuthStack = {
  Login: undefined
  CreateAccount: undefined
  ForgotPassword: undefined
}
export type ParamListFeedStack = {
  Feed: undefined
  Comment: { postId: number }
  CreatePost: {
    photo: {
      uri: string
      width: number
      height: number
    }
  }
}
export type ParamListTankStack = {
  Tank: undefined
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
// Tank Tab ********************************************************************
export type NavPropsTank = NativeStackScreenProps<ParamListTankStack, 'Tank'>
