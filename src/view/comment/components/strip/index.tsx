import React from 'react'
import { IconButton } from 'react-native-paper'
import moment from 'moment'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import * as Haptics from 'expo-haptics'

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
  ActionView,
  DeleteButton,
  ReplyButton,
  Icon,
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

  const renderRightActions = () => {
    return (
      <ActionView renderDelete={renderDelete}>
        <ReplyButton
          onPress={replyFunction}
          rippleColor={theme.colors.onSurface}
        >
          <Icon
            compact
            uppercase={false}
            labelStyle={{ fontSize: theme.fonts.sizes.xxsmall }}
            icon="reply"
          >
            Reply
          </Icon>
        </ReplyButton>
        {renderDelete && (
          <DeleteButton
            onPress={deleteFunction}
            disabled={deleteRefreshing}
            rippleColor={theme.colors.onSurface}
          >
            <Icon
              compact
              uppercase={false}
              labelStyle={{ fontSize: theme.fonts.sizes.xxsmall }}
              icon="delete-outline"
              loading={deleteRefreshing}
            >
              Delete
            </Icon>
          </DeleteButton>
        )}
      </ActionView>
    )
  }

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onActivated={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
    >
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
              icon="reply"
            >
              reply
            </PaperButton>
          </FooterRowView>
        </ContentView>
      </RowView>
    </Swipeable>
  )
}

export default Strip
