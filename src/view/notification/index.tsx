import React from 'react'
import { Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { Divider, Subheading } from 'react-native-paper'
import moment from 'moment'

import { NavPropsNotification } from '../../routes/types'
import * as NotificationAPI from '../../API/notification'
import EmptyScreen from '../components/emptyScreen'
import notificationRTK from '../../store/notification'
import { NotificationState } from 'store/notification/types'
import {
  Container,
  StyledFlatList,
  MessageContent,
  TitleContent,
  DateText,
  StyledPressable,
  IconImage,
} from './styles'

const Notification: React.FC<NavPropsNotification> = ({ navigation }) => {
  const dispacth = useDispatch()
  const { notification } = useSelector((state: RootState) => state)

  React.useEffect(() => {
    NotificationAPI.getAllByUser().then(response => {
      if (response && !('statusCode' in response)) {
        dispacth(notificationRTK.actions.setNotification(response))
      }
    })
  }, [dispacth])

  const renderList = (item: NotificationState) => {
    let iconType = require('../../assets/icons/notification.png')
    switch (item.title) {
      case 'Comment Replied':
        iconType = require('../../assets/icons/replied.png')
        break
      case 'Someone liked your comment':
        iconType = require('../../assets/icons/likeComment.png')
        break
      case 'Post Liked':
        iconType = require('../../assets/icons/likePost.png')
        break
      case 'New comment':
        iconType = require('../../assets/icons/newComment.png')
        break
      default:
        iconType = require('../../assets/icons/notification.png')
        break
    }

    const handleClick = () => {
      const postId = item.postId || undefined
      const commentId = item.commentId || undefined
      if (commentId || postId) {
        navigation.navigate('PostDetail', { postId, commentId })
      }
    }

    return (
      <StyledPressable onPress={handleClick}>
        <>
          <IconImage source={iconType} />
          <MessageContent>
            <TitleContent>
              <MessageContent>
                <Subheading>{item.title}</Subheading>
              </MessageContent>
              <DateText>{moment(item.createdAt).fromNow()}</DateText>
            </TitleContent>
            <Text>{item.message}</Text>
          </MessageContent>
        </>
      </StyledPressable>
    )
  }

  if (notification.length === 0) {
    return (
      <EmptyScreen
        onPress={() => null}
        text="There is no notification"
        icon="bell-outline"
      />
    )
  }

  return (
    <Container>
      <StyledFlatList
        data={notification}
        renderItem={({ item }) => renderList(item as NotificationState)}
        ItemSeparatorComponent={() => <Divider />}
      />
    </Container>
  )
}

export default Notification
