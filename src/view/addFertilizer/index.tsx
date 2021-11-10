import React, { useState, useEffect } from 'react'
import { TouchableRipple, Divider } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList, LayoutAnimation } from 'react-native'
import _ from 'lodash'

import * as API from '../../API/fertilizer'
import FertilizerRTK from '../../store/fertilizer'
import { FertilizerState } from '../../store/fertilizer/types'
import { NavPropsFertilizerList } from '../../routes/types'
import { RootState } from '../../store/rootReducer'
import SelectDose from './components/selectDose'
import { MainView, Searchbar, Text, RowView, ThumbImage } from './styles'
import { fullImageUrl } from '../../services/helper'
import { handleClickProps } from './types'

const AddFertilizer: React.FC<NavPropsFertilizerList> = ({
  route,
  navigation,
}) => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [selectDoseAlert, setSelectDoseAlert] = useState(false)
  const [fertilizerId, setFertilizerId] = useState(0)
  const [fertilizerName, setFertilizerName] = useState('')
  const [fertilizerAvatar, setFertilizerAvatar] = useState<string | null>(null)
  const { fertilizer } = useSelector((state: RootState) => state)

  useEffect(() => {
    const fetchFertilizers = async () => {
      const response = await API.getAll()
      if (!response || 'statusCode' in response) {
        return
      }
      dispatch(FertilizerRTK.actions.setFertilizer(response))
    }
    fetchFertilizers()
  }, [dispatch])

  const changeSearchText = (text: string) => {
    setSearch(text)
  }

  const handleClick = ({ id, name, avatar }: handleClickProps) => {
    setFertilizerId(id)
    setFertilizerName(name)
    setFertilizerAvatar(avatar)

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    setSelectDoseAlert(true)
  }

  const renderList = (item: FertilizerState) => (
    <TouchableRipple
      onPress={() =>
        handleClick({ id: item.id, name: item.name, avatar: item.avatar })
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
      <SelectDose
        visible={selectDoseAlert}
        onDismiss={setSelectDoseAlert}
        fertilizerId={fertilizerId}
        fertilizerName={fertilizerName}
        avatar={fertilizerAvatar}
        navigation={navigation}
        route={route}
      />
      <FlatList
        data={_.filter(fertilizer, item => {
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

export default AddFertilizer
