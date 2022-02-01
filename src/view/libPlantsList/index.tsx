import React, { useState, useEffect } from 'react'
import { TouchableRipple, Divider } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList } from 'react-native'
import filter from 'lodash/filter'
import toUpper from 'lodash/toUpper'

import * as API from '../../API/plant'
import PlantRTK from '../../store/plant'
import { PlantState } from '../../store/plant/types'
import { NavPropsLibPlants } from '../../routes/types'
import { RootState } from '../../store/rootReducer'
import { fullImageUrl } from '../../services/helper'
import { GoDetailProps } from './types'
import { MainView, Searchbar, Text, RowView, ThumbImage } from './styles'

const LibPlantsList: React.FC<NavPropsLibPlants> = ({ navigation }) => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const { plant } = useSelector((state: RootState) => state)

  useEffect(() => {
    const fetchPlants = async () => {
      const response = await API.getAll()
      if (!response || 'statusCode' in response) {
        return
      }
      dispatch(PlantRTK.actions.setPlant(response))
    }
    fetchPlants()
  }, [dispatch])

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
        <ThumbImage source={fullImageUrl(item.avatar)} resizeMode="contain" />
        <Text>{item.name}</Text>
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
        renderItem={({ item }) => renderList(item)}
        ItemSeparatorComponent={() => <Divider />}
      />
    </MainView>
  )
}

export default LibPlantsList
