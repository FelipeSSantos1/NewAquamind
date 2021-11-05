import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { LayoutAnimation } from 'react-native'
import * as Haptics from 'expo-haptics'
import { Divider } from 'react-native-paper'
import {
  SwipeableFlatList,
  SwipeableQuickActionButton,
  SwipeableQuickActions,
} from 'react-native-swipe-list'

import ActionButton from './components/actionButton'
import { DimentionsString } from './types'
import Strip from './components/strip'
import TankRTK from '../../store/tank'
import { baseImageUrl } from '../../services/constant'
import * as API from '../../API/tank'
import AvatarImg from '../../assets/Avatar.png'
import theme from '../../theme'
import ConfigRTK from '../../store/config'
import {
  HeaderView,
  Avatar,
  AddNewButton,
  HeaderTitle,
  ContentView,
  Container,
} from './styles'
import { NavPropsTank } from 'routes/types'

const MyTank: React.FC<NavPropsTank> = ({ navigation }) => {
  const { user, tank } = useSelector((state: RootState) => state)
  const [refreshing, setRefreshing] = React.useState(false)
  const [loadingDelete, setLoadingDelete] = React.useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetch() {
      const response = await API.getAllByUser()
      if (!response || 'statusCode' in response) {
        return
      }

      dispatch(TankRTK.actions.setTank(response))
    }
    fetch()
  }, [dispatch])

  const reFetch = async () => {
    setRefreshing(true)
    const response = await API.getAllByUser()
    setRefreshing(false)
    if (!response || 'statusCode' in response) {
      return
    }

    dispatch(TankRTK.actions.setTank(response))
  }

  const handleDeleteTank = (id: number, name: string) => {
    dispatch(
      ConfigRTK.actions.setAlert({
        visible: true,
        alertTitle: 'Delete Tank',
        alertMessage: `Are you sure you want to delete "${name}" tank?`,
        okText: 'Yes',
        cancelText: 'No',
        okPress: () => deleteTank(id),
      })
    )
  }

  const deleteTank = async (id: number) => {
    setLoadingDelete(true)
    setRefreshing(true)
    const response = await API.deleteTank(id)
    if (!response) {
      setLoadingDelete(false)
      setRefreshing(false)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      return
    }
    if ('statusCode' in response) {
      setLoadingDelete(false)
      setRefreshing(false)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
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
    await reFetch()
    setLoadingDelete(false)
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  }

  const dimentions = ({ length, width, height }: DimentionsString) => {
    if (length && width && height) {
      return `${length}x${width}x${height}`
    } else {
      return ''
    }
  }

  return (
    <Container>
      <HeaderView>
        <Avatar
          source={
            user.Profile.avatar
              ? { uri: `${baseImageUrl}/${user.Profile.avatar}` }
              : AvatarImg
          }
        />
      </HeaderView>
      <ContentView>
        <HeaderTitle>{`@${user.Profile.username}`}</HeaderTitle>
        <AddNewButton
          mode="text"
          icon="plus"
          onPress={() => navigation.navigate('AddEditTank', {})}
        >
          Add new
        </AddNewButton>
        <SwipeableFlatList
          refreshing={refreshing}
          onRefresh={() => reFetch()}
          ItemSeparatorComponent={() => <Divider />}
          data={tank}
          renderItem={({ item }) => (
            <Strip
              createdAt={item.born || null}
              dimensions={dimentions({
                height: item.height,
                length: item.length,
                width: item.width,
              })}
              title={item.name}
              imageURL={item.avatar}
            />
          )}
          keyExtractor={index => index.id.toString()}
          renderRightActions={({ item }) => (
            <SwipeableQuickActions>
              <SwipeableQuickActionButton
                text={
                  <ActionButton
                    bkgColor={theme.colors.error}
                    disabled={loadingDelete}
                    icon="delete-outline"
                    label="Delete"
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut
                      )
                      handleDeleteTank(item.id, item.name)
                    }}
                  />
                }
                style={{ backgroundColor: theme.colors.error }}
              />
              <SwipeableQuickActionButton
                text={
                  <ActionButton
                    bkgColor={theme.colors.text}
                    icon="square-edit-outline"
                    label="Update"
                    onPress={() =>
                      navigation.navigate('AddEditTank', { tankId: item.id })
                    }
                  />
                }
                style={{ backgroundColor: theme.colors.text }}
              />
            </SwipeableQuickActions>
          )}
        />
      </ContentView>
    </Container>
  )
}

export default MyTank
