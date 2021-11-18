import React from 'react'
import { IconButton } from 'react-native-paper'
import moment from 'moment'

import theme from '../../../../theme'
import { fullImageUrl } from '../../../../services/helper'
import { StripProps } from './types'
import {
  Avatar,
  RowView,
  TextUserName,
  TextMessage,
  ContentView,
  FooterRowView,
  FooterText,
} from './styles'

const Strip: React.FC<StripProps> = ({ item, sub, highlight }) => {
  const liked = item.LikeComment.length > 0
  return (
    <RowView sub={sub} highlight={highlight}>
      <Avatar source={fullImageUrl(item.Profile.avatar)} size={30} />
      <ContentView>
        <RowView sub={false}>
          <TextMessage>
            <TextUserName>{item.Profile.username} </TextUserName>
            {item.comment}
          </TextMessage>
          <IconButton
            icon={liked ? 'heart' : 'heart-outline'}
            color={liked ? theme.colors.error : theme.colors.text}
            size={15}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}
          />
        </RowView>
        <FooterRowView sub={false}>
          <FooterText>{moment(item.createdAt).fromNow()}</FooterText>
          <FooterText>{`${item._count.LikeComment} likes`}</FooterText>
        </FooterRowView>
      </ContentView>
    </RowView>
  )
}

export default Strip
