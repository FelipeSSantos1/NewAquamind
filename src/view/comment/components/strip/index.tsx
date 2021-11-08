import React from 'react'
import { IconButton } from 'react-native-paper'
import moment from 'moment'

import theme from '../../../../theme'
import { fullImageUrl } from '../../../../services/helper'
import { PropsType } from './types'
import {
  Avatar,
  RowView,
  TextUserName,
  TextMessage,
  ContentView,
  FooterRowView,
  FooterText,
  PaperButton,
  LabelStyle,
} from './styles'

const Strip: React.FC<PropsType> = ({
  item,
  likeFunction,
  replyFunction,
  refreshing,
  sub,
  renderDelete,
  deleteRefreshing,
  deleteFunction,
}) => {
  const liked = item.LikeComment.length > 0
  return (
    <RowView sub={sub}>
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
            onPress={likeFunction}
            disabled={refreshing}
            animated={true}
            size={15}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}
          />
        </RowView>
        <FooterRowView sub={false}>
          <FooterText>{moment(item.createdAt).fromNow()}</FooterText>
          <FooterText>{`${item._count.LikeComment} likes`}</FooterText>
          <PaperButton
            mode="text"
            compact
            color={theme.colors.lightText}
            labelStyle={LabelStyle.text}
            uppercase={false}
            onPress={replyFunction}
          >
            Reply
          </PaperButton>
          {renderDelete && (
            <PaperButton
              disabled={deleteRefreshing}
              loading={deleteRefreshing}
              mode="text"
              compact
              color={theme.colors.lightText}
              labelStyle={LabelStyle.text}
              uppercase={false}
              onPress={deleteFunction}
            >
              Delete
            </PaperButton>
          )}
        </FooterRowView>
      </ContentView>
    </RowView>
  )
}

export default Strip
