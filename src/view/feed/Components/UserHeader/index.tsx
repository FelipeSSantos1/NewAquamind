import React from 'react'
import { View } from 'react-native'
import moment from 'moment'

import defaultAvatar from '../../../../assets/Avatar.png'
import { RowView, Avatar, Text, Dimensions, Date } from './styles'

type UserHeaderProps = {
  url?: string
  userName: string
  dimensions: string
  date: string
}
export default ({ url, userName, dimensions, date }: UserHeaderProps) => {
  return (
    <RowView>
      <Avatar source={url ? { uri: url } : defaultAvatar} />
      <View>
        <Text>{userName}</Text>
        <Dimensions>{dimensions}</Dimensions>
      </View>
      <Date>{moment(date).fromNow()}</Date>
    </RowView>
  )
}
