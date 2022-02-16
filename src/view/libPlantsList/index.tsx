import React, { useState } from 'react'
import { TouchableRipple, Divider, IconButton } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList } from 'react-native'
import FakeLoadingScreen from '../components/fakeLoadingScreen'
import filter from 'lodash/filter'
import toUpper from 'lodash/toUpper'
import { useQuery, useQueryClient } from 'react-query'

import * as API from '../../API/plant'
import PlantRTK from '../../store/plant'
import { PlantState } from '../../store/plant/types'
import { NavPropsLibPlants } from '../../routes/types'
import { RootState } from '../../store/rootReducer'
import { fullImageUrl } from '../../services/helper'
import { GoDetailProps } from './types'
import {
  MainView,
  Searchbar,
  Text,
  RowView,
  ThumbImage,
  RowViewText,
} from './styles'

const LibPlantsList: React.FC<NavPropsLibPlants> = ({ navigation }) => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
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
  const reFetch = () => {
    queryClient.invalidateQueries('getPlants')
  }

  const changeSearchText = (text: string) => {
    setSearch(text)
  }

  const goDetail = async ({ id }: GoDetailProps) => {
    navigation.navigate('LibPlantDetail', {
      plantId: id,
    })
  }

  const renderList = (item: PlantState) => (
    <TouchableRipple onPress={() => goDetail({ id: item.id })}>
      <RowView>
        <RowViewText>
          <ThumbImage source={fullImageUrl(item.avatar)} resizeMode="contain" />
          <Text>{item.name}</Text>
        </RowViewText>
        <IconButton size={24} icon="chevron-right" />
      </RowView>
    </TouchableRipple>
  )

  return (
    <MainView>
      <Searchbar
        value={search}
        onChangeText={text => changeSearchText(text)}
        autoComplete="off"
      />
      <FlatList
        data={filter(plant, item => {
          if (toUpper(item.name).search(toUpper(search)) !== -1) {
            return true
          }
          return false
        })}
        onRefresh={reFetch}
        refreshing={isFetching}
        renderItem={({ item }) => renderList(item)}
        ItemSeparatorComponent={() => <Divider />}
      />
    </MainView>
  )
}

export default LibPlantsList
