import React from 'react'
import { Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { Divider, IconButton, Subheading } from 'react-native-paper'
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
    let iconType = 'bell-outline'
    if (item.title) {
      iconType =
        item.title.search('Liked') !== -1
          ? 'heart-outline'
          : item.title.search('Replied') !== -1
          ? 'comment-text-multiple-outline'
          : 'bell-outline'
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
          <IconButton icon={iconType} />
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
