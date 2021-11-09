import React, { useState, useEffect } from 'react'
import { TouchableRipple, Divider } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList } from 'react-native'
import _ from 'lodash'

import * as API from '../../API/fertilizer'
import FertilizerRTK from '../../store/fertilizer'
import { FertilizerState } from '../../store/fertilizer/types'
import { NavPropsFertilizerList } from '../../routes/types'
import { RootState } from '../../store/rootReducer'
import theme from '../../theme'
import SelectDose from './components/selectDose'
import { MainView, Searchbar, Text, Icon, RowView } from './styles'

const AddFertilizer: React.FC<NavPropsFertilizerList> = ({
  route,
  navigation,
}) => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [selectDoseAlert, setSelectDoseAlert] = useState(false)
  const [fertilizerId, setFertilizerId] = useState(0)
  const [fertilizerName, setFertilizerName] = useState('')
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

  type handleClickProps = {
    id: number
    name: string
  }
  const handleClick = ({ id, name }: handleClickProps) => {
    setFertilizerId(id)
    setFertilizerName(name)
    setSelectDoseAlert(true)
  }

  const renderList = (item: FertilizerState) => (
    <TouchableRipple
      onPress={() => handleClick({ id: item.id, name: item.name })}
      hasTVPreferredFocus={undefined}
      tvParallaxProperties={undefined}
    >
      <RowView>
        <Icon
          icon="water-outline"
          color={theme.colors.primary}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
        />
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
