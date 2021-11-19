import React, { useState, useEffect } from 'react'
import { TouchableRipple, Divider } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList } from 'react-native'
import _ from 'lodash'

import * as API from '../../API/plant'
import PlantRTK from '../../store/plant'
import { PlantState } from '../../store/plant/types'
import { NavPropsPlantList } from '../../routes/types'
import { RootState } from '../../store/rootReducer'
import { fullImageUrl } from '../../services/helper'
import { SaveProps } from './types'
import { MainView, Searchbar, Text, RowView, ThumbImage } from './styles'

const AddPlant: React.FC<NavPropsPlantList> = ({ navigation, route }) => {
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
    <TouchableRipple
      onPress={() =>
        save({ id: item.id, name: item.name, avatar: item.avatar })
      }
      hasTVPreferredFocus={undefined}
      tvParallaxProperties={undefined}
    >
      <RowView>
        <ThumbImage source={fullImageUrl(item.avatar)} resizeMode="contain" />
        <Text>{item.name}</Text>
      </RowView>
    </TouchableRipple>
  )

  return (
    <MainView>
      <Searchbar value={search} onChangeText={text => changeSearchText(text)} />
      <FlatList
        data={_.filter(plant, item => {
          if (_.toUpper(item.name).search(_.toUpper(search)) !== -1) {
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
