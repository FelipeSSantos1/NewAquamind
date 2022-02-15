import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import * as Haptics from 'expo-haptics'
import { ScrollView, RefreshControl, LayoutAnimation } from 'react-native'
import { useQuery, useQueryClient } from 'react-query'

import BannerImg from '../../assets/banner.png'
import EmptyScreen from '../components/emptyScreen'
import { DimentionsString } from './types'
import Strip from './components/strip'
import TankRTK from '../../store/tank'
import * as API from '../../API/tank'
import * as PlantAPI from '../../API/plant'
import * as FertilizerAPI from '../../API/fertilizer'
import ConfigRTK from '../../store/config'
import { NavPropsTank } from 'routes/types'
import { Container, PaperFAB, BannerTop } from './styles'
import map from 'lodash/map'
import FakeLoadingScreen from '../components/fakeLoadingScreen'

const MyTank: React.FC<NavPropsTank> = ({ navigation, route }) => {
  const { tank } = useSelector((state: RootState) => state)
  const [loadingDelete, setLoadingDelete] = React.useState(false)
  const dispatch = useDispatch()
  // START - pre fetching datas ******************************************************
  const queryClient = useQueryClient()
  queryClient.prefetchQuery('getFertilizer', FertilizerAPI.getAll, {
    staleTime: 60000 * 60 * 24,
  })
  queryClient.prefetchQuery('getPlants', PlantAPI.getAll, {
    staleTime: 60000 * 60 * 24,
  })
  // END - pre fetching datas ******************************************************

  useEffect(() => {
    if (route.params.refresh) {
      queryClient.invalidateQueries('getUserTanks')
    }
  }, [queryClient, route.params.refresh])

  const { data: response, isFetching } = useQuery(
    'getUserTanks',
    API.getAllByUser,
    {
      staleTime: Infinity,
    }
  )
  const reFetch = () => {
    queryClient.invalidateQueries('getUserTanks')
  }

  if (!response || 'statusCode' in response) {
    return <FakeLoadingScreen />
  }
  if (!isFetching) {
    dispatch(TankRTK.actions.setTank(response))
  }

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
    const deleteResponse = await API.deleteTank(id)
    if (!deleteResponse) {
      setLoadingDelete(false)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      return
    }
    if ('statusCode' in deleteResponse) {
      setLoadingDelete(false)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: deleteResponse.message,
          okText: 'Ok',
        })
      )
      return
    }
    togleActionActive(index, false)
    reFetch()
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
              <RefreshControl
                refreshing={isFetching || loadingDelete}
                onRefresh={reFetch}
              />
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
