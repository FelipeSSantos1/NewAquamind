import React, { useState } from 'react'
import { TouchableRipple, IconButton } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList } from 'react-native'
import FakeLoadingScreen from '../components/fakeLoadingScreen'
import filter from 'lodash/filter'
import toUpper from 'lodash/toUpper'
import { useQuery, useQueryClient } from 'react-query'

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
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const { algae } = useSelector((state: RootState) => state)

  const { data: response, isFetching } = useQuery('getAlgaes', API.getAll, {
    staleTime: 60000 * 60 * 24,
    cacheTime: 60000 * 60 * 24,
  })
  if (isFetching && !algae.length) {
    return <FakeLoadingScreen />
  }
  if (response && !('statusCode' in response)) {
    dispatch(AlgaeRTK.actions.setAlgae(response))
  }
  const reFetch = () => {
    queryClient.invalidateQueries('getAlgaes')
  }

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
        onRefresh={reFetch}
        refreshing={isFetching}
        renderItem={({ item }) => renderList(item)}
        ItemSeparatorComponent={() => <PaperDivider />}
        showsVerticalScrollIndicator={false}
      />
    </MainView>
  )
}

export default LibAlgaeList
