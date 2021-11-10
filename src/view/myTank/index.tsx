import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import * as Haptics from 'expo-haptics'
import { ScrollView, RefreshControl, LayoutAnimation } from 'react-native'
import { Divider } from 'react-native-paper'

import Header from './components/header'
import { DimentionsString } from './types'
import Strip from './components/strip'
import TankRTK from '../../store/tank'
import { fullImageUrl } from '../../services/helper'
import * as API from '../../API/tank'
import ConfigRTK from '../../store/config'
import { NavPropsTank } from 'routes/types'
import {
  HeaderView,
  Avatar,
  HeaderTitle,
  ContentView,
  Container,
} from './styles'
import _ from 'lodash'

const MyTank: React.FC<NavPropsTank> = ({ navigation, route }) => {
  const { user, tank } = useSelector((state: RootState) => state)
  const [refreshing, setRefreshing] = React.useState(false)
  const [loadingDelete, setLoadingDelete] = React.useState(false)
  const [actionActive, setActionActive] = React.useState<boolean[]>([])
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

  const togleActionActive = (index: number, value: boolean) => {
    const newActionActive = [...actionActive]
    newActionActive[index] = value
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setActionActive(newActionActive)
  }

  const renderTanks = () => {
    return _.map(tank, (item, index) => (
      <>
        <Strip
          key={`tank-${index}`}
          createdAt={item.born || null}
          dimensions={dimentions({
            height: item.height,
            length: item.length,
            width: item.width,
          })}
          title={item.name}
          imageURL={item.avatar}
          tank={item}
          navigation={navigation}
          route={route}
          onDelete={() => {
            handleDeleteTank(item.id, item.name)
          }}
          onUpdate={() =>
            navigation.navigate('AddEditTank', { tankId: item.id })
          }
          loadingDelete={loadingDelete}
          actionActive={actionActive[index]}
          setActionActive={() => togleActionActive(index, !actionActive[index])}
        />
        <Divider key={`divider-${index}`} />
      </>
    ))
  }

  return (
    <Container>
      <HeaderView>
        <Avatar source={fullImageUrl(user.Profile.avatar)} />
      </HeaderView>
      <ContentView>
        <HeaderTitle>{user.Profile.username}</HeaderTitle>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={reFetch} />
          }
        >
          <Header navigation={navigation} route={route} />
          {renderTanks()}
        </ScrollView>
      </ContentView>
    </Container>
  )
}

export default MyTank
