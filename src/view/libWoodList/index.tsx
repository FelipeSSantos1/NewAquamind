import React, { useState } from 'react'
import { TouchableRipple, IconButton } from 'react-native-paper'
import { FlatList } from 'react-native'
import FakeLoadingScreen from '../components/fakeLoadingScreen'
import filter from 'lodash/filter'
import toUpper from 'lodash/toUpper'
import { useQuery, useQueryClient } from 'react-query'

import * as API from '../../API/wood'
import { getAllWoodResponse } from 'API/wood/types'
import { NavPropsLibWood } from '../../routes/types'
import { fullImageUrl } from '../../services/helper'
import { GoDetailProps } from './types'
import {
  MainView,
  Searchbar,
  CommonName,
  RowView,
  ThumbImage,
  PaperDivider,
  RowViewText,
  ContentDescription,
} from './styles'

const LibWoodList: React.FC<NavPropsLibWood> = ({ navigation }) => {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')

  const { data: response, isFetching } = useQuery('getWoods', API.getAll, {
    staleTime: 60000 * 60 * 24,
    cacheTime: 60000 * 60 * 24,
  })
  if (isFetching || !response || 'statusCode' in response) {
    return <FakeLoadingScreen />
  }
  const reFetch = () => {
    queryClient.invalidateQueries('getWoods')
  }

  const changeSearchText = (text: string) => {
    setSearch(text)
  }

  const goDetail = async ({ id }: GoDetailProps) => {
    navigation.navigate('LibWoodDetail', {
      woodId: id,
    })
  }

  const renderList = (item: getAllWoodResponse) => (
    <TouchableRipple onPress={() => goDetail({ id: item.id })}>
      <RowView>
        <RowViewText>
          <ThumbImage source={fullImageUrl(item.thumb)} resizeMode="cover" />
          <ContentDescription>
            <CommonName>{item.name}</CommonName>
          </ContentDescription>
        </RowViewText>
        <IconButton size={24} icon="chevron-right" />
      </RowView>
    </TouchableRipple>
  )

  return (
    <MainView>
      <Searchbar value={search} onChangeText={text => changeSearchText(text)} autoComplete="off" />
      <FlatList
        data={filter(response, item => {
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

export default LibWoodList
