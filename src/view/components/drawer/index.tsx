import React, { useRef } from 'react'
import {
  View,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Portal, Drawer } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../../store/rootReducer'
// import UserRTK from '../../../store/user'
// import TanksRTK from '../../../store/tanks'
// import PlantsRTK from '../../../store/plants'
// import FertilizersRTK from '../../../store/fertilizers'
import ConfigRTK from '../../../store/config'
import Logout from '../../../store/logout'
import {
  MainView,
  DialogContent,
  EmptyView,
  CloseButtonAnimation,
  CloseButton,
  CloseButtonText,
} from './styles'

const BottomDrawer: React.FC = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const contentDrawer = useRef<Animatable.View & View>(null)
  const portalDrawer = useRef<Animatable.View & View>(null)
  const drawerVisible = useSelector(
    (state: RootState) => state.config.drawerVisible
  )

  const hide = async (toScreen?: string) => {
    if (portalDrawer.current?.fadeOut) {
      portalDrawer.current.fadeOut(300)
    }
    if (contentDrawer.current?.fadeOutDownBig) {
      await contentDrawer.current.fadeOutDownBig(300)
    }
    dispatch(ConfigRTK.actions.showDrawer(false))
    if (toScreen) {
      navigation.navigate(toScreen)
    }
  }

  return (
    <Portal>
      {drawerVisible && (
        <MainView ref={portalDrawer} animation="fadeIn" duration={300}>
          <TouchableWithoutFeedback onPress={() => hide()} style={{ flex: 1 }}>
            <EmptyView />
          </TouchableWithoutFeedback>
          <SafeAreaView>
            <DialogContent
              ref={contentDrawer}
              animation="fadeInUpBig"
              duration={300}
            >
              <ScrollView>
                <Drawer.Item
                  label="Profile"
                  icon="account"
                  onPress={() => hide('profile')}
                />
                <Drawer.Item
                  label="Send us a message"
                  icon="message-text-outline"
                  onPress={() => hide('contactUs')}
                />
                <Drawer.Item
                  label="Credits"
                  icon="format-quote-open"
                  onPress={() => console.log('credits')}
                />
                <Drawer.Item
                  label="Log out"
                  icon="logout"
                  onPress={() => Logout()}
                />
              </ScrollView>
            </DialogContent>
            <CloseButtonAnimation animation="fadeIn" duration={200} delay={200}>
              <CloseButton
                onPress={() => hide()}
                hasTVPreferredFocus={undefined}
                tvParallaxProperties={undefined}
              >
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
