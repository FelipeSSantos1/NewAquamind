import React, { useState } from 'react'
import { TouchableRipple, Divider } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList } from 'react-native'
import filter from 'lodash/filter'
import toUpper from 'lodash/toUpper'
import { useQuery } from 'react-query'

import * as API from '../../API/plant'
import PlantRTK from '../../store/plant'
import { PlantState } from '../../store/plant/types'
import { NavPropsPlantList } from '../../routes/types'
import { RootState } from '../../store/rootReducer'
import { fullImageUrl } from '../../services/helper'
import { SaveProps } from './types'
import FakeLoadingScreen from '../components/fakeLoadingScreen'
import { MainView, Searchbar, Text, RowView, ThumbImage } from './styles'

const AddPlant: React.FC<NavPropsPlantList> = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const { plant } = useSelector((state: RootState) => state)

  const { data: response, isFetching } = useQuery('getPlants', API.getAll, {
    staleTime: 60000 * 60 * 24,
    cacheTime: 60000 * 60 * 24,
  })
  if (isFetching && !plant.length) {
    return <FakeLoadingScreen />
  }
  if (response && !('statusCode' in response)) {
    dispatch(PlantRTK.actions.setPlant(response))
  }

  const changeSearchText = (text: string) => {
    setSearch(text)
  }

  const save = async ({ id, name, avatar }: SaveProps) => {
    const plantData = {
      id,
      name,
      avatar,
    }
    navigation.navigate('AddEditTank', {
      plants: {
        ...plantData,
      },
      tank: route.params.tank,
    })
  }

  const renderList = (item: PlantState) => (
    <TouchableRipple onPress={() => save({ id: item.id, name: item.name, avatar: item.avatar })}>
      <RowView>
        <ThumbImage source={fullImageUrl(item.avatar)} resizeMode="contain" />
        <Text>{item.name}</Text>
      </RowView>
    </TouchableRipple>
  )

  return (
    <MainView>
      <Searchbar value={search} onChangeText={text => changeSearchText(text)} autoComplete="off" />
      <FlatList
        data={filter(plant, item => {
          if (toUpper(item.name).search(toUpper(search)) !== -1) {
            return true
          }
          return false
        })}
        renderItem={({ item }) => renderList(item)}
        ItemSeparatorComponent={() => <Divider />}
      />
    </MainView>
  )
}

export default AddPlant
