import React, { useRef } from 'react'
import { View, ScrollView, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Portal, Drawer } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../../store/rootReducer'
import ConfigRTK from '../../../store/config'
import Logout from '../../../store/logout'
import {
  MainView,
  DialogContent,
  EmptyView,
  CloseButtonAnimation,
  CloseButton,
  CloseButtonText,
  TouchableWithoutFeedback,
} from './styles'

const BottomDrawer: React.FC = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const contentDrawer = useRef<Animatable.View & View>(null)
  const portalDrawer = useRef<Animatable.View & View>(null)
  const drawerVisible = useSelector((state: RootState) => state.config.drawerVisible)

  const hide = async (callback?: CallableFunction) => {
    if (portalDrawer.current?.fadeOut) {
      portalDrawer.current.fadeOut(300)
    }
    if (contentDrawer.current?.fadeOutDownBig) {
      await contentDrawer.current.fadeOutDownBig(300)
    }
    dispatch(ConfigRTK.actions.showDrawer(false))
    if (callback) {
      callback()
    }
  }

  return (
    <Portal>
      {drawerVisible && (
        <MainView ref={portalDrawer} animation="fadeIn" duration={300}>
          <TouchableWithoutFeedback onPress={() => hide()}>
            <EmptyView />
          </TouchableWithoutFeedback>
          <SafeAreaView>
            <DialogContent ref={contentDrawer} animation="fadeInUpBig" duration={300}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Drawer.Item
                  label="Profile"
                  icon="account-outline"
                  onPress={() => hide(() => navigation.navigate('Profile'))}
                />
                <Drawer.Item
                  label="Notification Center"
                  icon="bell-outline"
                  onPress={() => hide(() => navigation.navigate('Notification'))}
                />
                <Drawer.Item
                  label="Send us a message"
                  icon="message-text-outline"
                  onPress={() => hide(() => navigation.navigate('ContactUs'))}
                />
                {/* <Drawer.Item
                  label="Credits"
                  icon="format-quote-open"
                  onPress={() => console.log('credits')}
                /> */}
                <Drawer.Item label="Log out" icon="logout" onPress={() => Logout()} />
              </ScrollView>
            </DialogContent>
            <CloseButtonAnimation animation="fadeIn" duration={200} delay={200}>
              <CloseButton onPress={() => hide()}>
                <CloseButtonText>Cancel</CloseButtonText>
              </CloseButton>
            </CloseButtonAnimation>
          </SafeAreaView>
        </MainView>
      )}
    </Portal>
  )
}

export default BottomDrawer
