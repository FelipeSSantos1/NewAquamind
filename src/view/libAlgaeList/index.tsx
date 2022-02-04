import React, { useState, useEffect } from 'react'
import { TouchableRipple, IconButton } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList } from 'react-native'
import filter from 'lodash/filter'
import toUpper from 'lodash/toUpper'

import * as API from '../../API/algae'
import AlgaeRTK from '../../store/algae'
import { AlgaeState } from '../../store/algae/types'
import { NavPropsLibAlgae } from '../../routes/types'
import { RootState } from '../../store/rootReducer'
import { fullImageUrl } from '../../services/helper'
import { GoDetailProps } from './types'
import {
  MainView,
  Searchbar,
  Text,
  RowView,
  ThumbImage,
  PaperDivider,
  RowViewText,
} from './styles'

const LibAlgaeList: React.FC<NavPropsLibAlgae> = ({ navigation }) => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const { algae } = useSelector((state: RootState) => state)

  useEffect(() => {
    const fetchPlants = async () => {
      const response = await API.getAll()
      if (!response || 'statusCode' in response) {
        return
      }
      dispatch(AlgaeRTK.actions.setAlgae(response))
    }
    fetchPlants()
  }, [dispatch])

  const changeSearchText = (text: string) => {
    setSearch(text)
  }

  const goDetail = async ({ id }: GoDetailProps) => {
    navigation.navigate('LibAlgaeDetail', {
      algaeId: id,
    })
  }

  const renderList = (item: AlgaeState) => (
    <TouchableRipple onPress={() => goDetail({ id: item.id })}>
      <RowView>
        <RowViewText>
          <ThumbImage
            source={fullImageUrl(item.Photos[0].url)}
            resizeMode="cover"
          />
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
        data={filter(algae, item => {
          if (toUpper(item.name).search(toUpper(search)) !== -1) {
            return true
          }
          return false
        })}
        renderItem={({ item }) => renderList(item)}
        ItemSeparatorComponent={() => <PaperDivider />}
        showsVerticalScrollIndicator={false}
      />
    </MainView>
  )
}

export default LibAlgaeList
