import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList } from 'react-native'
import { Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import _ from 'lodash'

import ConfigRTK from '../../store/config'
import FeedRTK from '../../store/feed'
import { Feed } from '../../store/feed/types'
import { RootState } from '../../store/rootReducer'
import { getAllFeed } from '../../API/feed'
import FeedBox from './components/feedBox'
import { NavPropsFeed } from '../../routes/types'
import { PaperFAB } from './styles'

const FeedView: React.FC<NavPropsFeed> = ({ navigation }) => {
  const dispatch = useDispatch()
  const feeds = useSelector((state: RootState) => state.feed)
  const user = useSelector((state: RootState) => state.user)
  const [refreshing, setRefreshing] = useState(false)
  const [bottomRefreshing, setBottomRefreshing] = useState(false)
  const [cursor, setCursor] = useState(0)

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
    dispatch(FeedRTK.actions.setFeed([]))
    setRefreshing(true)
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
