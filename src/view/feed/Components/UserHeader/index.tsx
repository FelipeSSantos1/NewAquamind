import React from 'react'
import { View } from 'react-native'
import moment from 'moment'

import { fullImageUrl } from '../../../../services/helper'
import { UserHeaderProps } from './types'
import { RowView, Avatar, Text, Dimensions, Date } from './styles'

const UserHeader: React.FC<UserHeaderProps> = ({ url, userName, dimensions, date }) => {
  return (
    <RowView>
      <Avatar source={fullImageUrl(url)} />
      <View>
        <Text>{userName}</Text>
        <Dimensions>{dimensions}</Dimensions>
      </View>
      <Date>{moment(date).fromNow()}</Date>
    </RowView>
  )
}

export default UserHeader
