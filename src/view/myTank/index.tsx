import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import * as Haptics from 'expo-haptics'
import { ScrollView, RefreshControl, LayoutAnimation } from 'react-native'

import BannerImg from '../../assets/banner.png'
import EmptyScreen from '../components/emptyScreen'
import { DimentionsString } from './types'
import Strip from './components/strip'
import TankRTK from '../../store/tank'
import * as API from '../../API/tank'
import ConfigRTK from '../../store/config'
import { NavPropsTank } from 'routes/types'
import { Container, PaperFAB, BannerTop } from './styles'
import map from 'lodash/map'

const MyTank: React.FC<NavPropsTank> = ({ navigation, route }) => {
  const { tank } = useSelector((state: RootState) => state)
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

  const reFetch = useCallback(async () => {
    setActionActive([])
    setRefreshing(true)
    const response = await API.getAllByUser()
    setRefreshing(false)
    if (!response || 'statusCode' in response) {
      return
    }

    dispatch(TankRTK.actions.setTank(response))
  }, [dispatch])

  useEffect(() => {
    if (route.params.refresh) {
      reFetch()
    }
  }, [reFetch, route.params.refresh])

  const handleDeleteTank = (id: number, name: string, index: number) => {
    dispatch(
      ConfigRTK.actions.setAlert({
        visible: true,
        alertTitle: 'Delete Tank',
        alertMessage: `Are you sure you want to delete "${name}" tank?`,
        okText: 'Yes',
        cancelText: 'No',
        okPress: () => deleteTank(id, index),
      })
    )
  }

  const deleteTank = async (id: number, index: number) => {
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
    togleActionActive(index, false)
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
    const newActionActive = []
    newActionActive[index] = value
    LayoutAnimation.configureNext(
      value
        ? LayoutAnimation.Presets.spring
        : LayoutAnimation.Presets.easeInEaseOut
    )
    setActionActive(newActionActive)
  }

  const renderTanks = () => {
    return map(tank, (item, index) => (
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
          handleDeleteTank(item.id, item.name, index)
        }}
        onUpdate={() => navigation.navigate('AddEditTank', { tank: item })}
        loadingDelete={loadingDelete}
        actionActive={actionActive[index]}
        setActionActive={() => togleActionActive(index, !actionActive[index])}
      />
    ))
  }

  return (
    <Container>
      {!tank.length ? (
        <EmptyScreen
          onPress={() => navigation.navigate('AddEditTank', {})}
          icon="plus-circle-outline"
          text="Add your first tank"
        />
      ) : (
        <>
          <BannerTop source={BannerImg} resizeMode="cover" />
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={reFetch} />
            }
          >
            {renderTanks()}
          </ScrollView>
          <PaperFAB
            icon="plus"
            onPress={() => navigation.navigate('AddEditTank', {})}
            small
          />
        </>
      )}
    </Container>
  )
}

export default MyTank
