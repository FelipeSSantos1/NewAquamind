import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert, FlatList, Platform } from 'react-native'
import { Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import _ from 'lodash'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'

import ConfigRTK from '../../store/config'
import FeedRTK from '../../store/feed'
import { Feed } from '../../store/feed/types'
import { RootState } from '../../store/rootReducer'
import { getAllFeed } from '../../API/feed'
import * as UserAPI from '../../API/user'
import { NavPropsFeed } from '../../routes/types'
import FeedBox from './components/feedBox'
import { PaperFAB } from './styles'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

const FeedView: React.FC<NavPropsFeed> = ({ navigation }) => {
  const dispatch = useDispatch()
  const feeds = useSelector((state: RootState) => state.feed)
  const { user } = useSelector((state: RootState) => state)
  const [refreshing, setRefreshing] = useState(false)
  const [bottomRefreshing, setBottomRefreshing] = useState(false)
  const [cursor, setCursor] = useState(0)

  // Notification things ******************************************************
  const [ready, setReady] = useState(false)

  async function registerForPushNotificationsAsync() {
    let token
    if (Constants.isDevice || Platform.OS === 'android') {
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
      token = (await Notifications.getExpoPushTokenAsync()).data
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
        })
      }
    }

    return token
  }

  useEffect(() => {
    if (ready) {
      registerForPushNotificationsAsync().then(async token => {
        if (_.trim(token)) {
          const pnToken = await SecureStore.getItemAsync('pnToken')
          if (!pnToken || _.trim(token) !== pnToken) {
            const response = await UserAPI.updatePNToken(_.trim(token))
            if (response && !('statusCode' in response)) {
              if (token) {
                await SecureStore.setItemAsync('pnToken', _.trim(token))
              }
            }
          }
        }
      })
    }
  }, [dispatch, ready])

  useEffect(() => {
    const showAlert = async () => {
      const pnToken = await SecureStore.getItemAsync('pnToken')

      if (_.trim(pnToken || undefined)) {
        setReady(true)
        return
      }
      dispatch(
        ConfigRTK.actions.setAlert({
          alertTitle: 'Notifications',
          alertMessage:
            'Enable notifications to get notified when someone likes your photos',
          visible: true,
          okPress: () => setReady(true),
          okText: 'OK',
        })
      )
    }
    showAlert()
  }, [dispatch])
  // End Notification things **************************************************

  const fetchFeed = async () => {
    const response = await getAllFeed({ take: 10, cursor })

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
      if (cursor > 0) {
        dispatch(FeedRTK.actions.setFeed([...feeds, ...response]))
      } else {
        dispatch(FeedRTK.actions.setFeed(response))
      }
      if (response.length) {
        setCursor(response[response.length - 1].id)
      }
    }
  }

  useEffect(() => {
    resetData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const resetData = async () => {
    setCursor(0)
    setRefreshing(true)
    dispatch(FeedRTK.actions.logout())
    await fetchFeed()
    setRefreshing(false)
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
      <FlatList
        showsVerticalScrollIndicator={false}
        data={feeds}
        renderItem={item => renderFeed(item)}
        keyExtractor={item => item.id.toString()}
        onRefresh={resetData}
        refreshing={refreshing}
        onEndReachedThreshold={0.5}
        onEndReached={() => fetchFeed()}
        ListFooterComponent={
          <Button
            mode="text"
            compact
            uppercase={false}
            loading={bottomRefreshing}
            disabled={bottomRefreshing}
            onPress={_.debounce(async () => {
              setBottomRefreshing(true)
              await fetchFeed()
              setBottomRefreshing(false)
            }, 300)}
          >
            Load More
          </Button>
        }
      />
      <PaperFAB icon="plus" onPress={pickImage} small />
    </>
  )
}

export default FeedView
