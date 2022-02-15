import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert, Platform, FlatList } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import trim from 'lodash/trim'
import * as Notifications from 'expo-notifications'
import * as SecureStore from 'expo-secure-store'
import * as Device from 'expo-device'
import { useQueryClient } from 'react-query'

import ConfigRTK from '../../store/config'
import FeedRTK from '../../store/feed'
import { Feed } from '../../store/feed/types'
import { RootState } from '../../store/rootReducer'
import { getAllFeed } from '../../API/feed'
import * as TankAPI from '../../API/tank'
import * as UserAPI from '../../API/user'
import { NavPropsFeed } from '../../routes/types'
import FeedBox from './components/feedBox'
import { PaperFAB, PaperFlatList } from './styles'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

const FeedView: React.FC<NavPropsFeed> = ({ navigation }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const flatListRef = useRef<FlatList>(null)
  const feeds = useSelector((state: RootState) => state.feed)
  const { user, config } = useSelector((state: RootState) => state)
  // START - pre fetching datas ******************************************************
  const queryClient = useQueryClient()
  queryClient.prefetchQuery('getUserTanks', TankAPI.getAllByUser, {
    staleTime: Infinity,
  })
  // END - pre fetching datas ******************************************************

  // START - Notification things ******************************************************
  async function registerForPushNotificationsAsync() {
    if (Device.isDevice || Platform.OS === 'android') {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

      if (finalStatus !== 'granted') {
        Alert.alert('Failed to get push token for push notification!')
        return
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
        })
      }

      return token
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(async token => {
      const pnToken = await SecureStore.getItemAsync('pnToken')
      if (trim(token) && trim(token) !== pnToken) {
        const response = await UserAPI.updatePNToken(trim(token))
        if (response && !('statusCode' in response)) {
          if (token) {
            await SecureStore.setItemAsync('pnToken', trim(token))
          }
        }
      } else {
        await SecureStore.setItemAsync('pnToken', 'noToken')
      }
    })
  }, [dispatch])
  // END - Notification things **************************************************

  useEffect(() => {
    if (config.feedCursor === 0 && feeds.length > 0 && !loading) {
      flatListRef.current?.scrollToIndex({ animated: true, index: 0 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.feedCursor])

  const fetchFeed = async (cursor: number | null = null) => {
    const response = await getAllFeed({
      take: 10,
      cursor: typeof cursor === 'number' ? cursor : config.feedCursor,
    })

    if (!response) {
      return
    }
    if ('statusCode' in response) {
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: response.message,
          okText: 'Ok',
        })
      )
      return
    }

    if (response) {
      if (typeof cursor !== 'number' && config.feedCursor > 0) {
        dispatch(FeedRTK.actions.setFeed([...feeds, ...response]))
      } else {
        dispatch(FeedRTK.actions.setFeed(response))
      }
      if (response.length) {
        dispatch(
          ConfigRTK.actions.setFeedCursor(response[response.length - 1].id)
        )
      }
    }
  }

  useEffect(() => {
    resetData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const resetData = async () => {
    setLoading(true)
    await fetchFeed(0)
    setLoading(false)
  }

  const renderFeed = ({ item }: { item: Feed }) => (
    <FeedBox
      key={item.id}
      feed={item}
      navigation={navigation}
      feeds={feeds}
      user={user}
    />
  )

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: 'We need media roll permissions to make this work!',
          okText: 'Ok',
        })
      )
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.cancelled) {
      navigation.navigate('CreatePost', {
        photo: {
          uri: result.uri,
          width: result.width,
          height: result.height,
        },
      })
    }
  }

  return (
    <>
      <PaperFlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={feeds}
        renderItem={item => renderFeed(item as { item: Feed })}
        keyExtractor={item => (item as Feed).id.toString()}
        onRefresh={resetData}
        refreshing={config.feedLoading || loading || false}
        onEndReachedThreshold={3}
        onEndReached={() => fetchFeed()}
      />
      <PaperFAB icon="plus" onPress={pickImage} small />
    </>
  )
}

export default FeedView
