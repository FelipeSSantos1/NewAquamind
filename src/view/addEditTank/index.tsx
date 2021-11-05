import React, { useEffect } from 'react'
import { View } from 'react-native'

import { NavPropsAddEditTank } from '../../routes/types'
// import { Container } from './styles';

const AddEditTank: React.FC<NavPropsAddEditTank> = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.tankId ? 'Update Tank' : 'New Tank',
    })
  }, [navigation, route.params.tankId])

  return <View />
}

export default AddEditTank
