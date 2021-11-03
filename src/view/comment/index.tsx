import React, { useEffect, useState, useCallback } from 'react'
import { FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Divider, IconButton } from 'react-native-paper'
import * as Haptics from 'expo-haptics'
import _ from 'lodash'

import { baseImageUrl } from '../../services/constant'
import ConfigRTK from '../../store/config'
import CommentRTK from '../../store/comment'
import * as API from '../../API/comment'
import { NavPropsComment } from '../../routes/types'
import { RootState } from 'store/rootReducer'
import { CommentState, SubComment } from '../../store/comment/types'
import theme from '../../theme'
import {
  Avatar,
  RowView,
  TextUserName,
  TextMessage,
  Container,
  SubRowView,
} from './styles'

const CommentView: React.FC<NavPropsComment> = ({ route }) => {
  const dispatch = useDispatch()
  const { comment } = useSelector((state: RootState) => state)
  const [refreshing, setRefreshing] = useState(false)
  const [likeRefreshing, setLikeRefreshing] = useState(false)

  const { postId } = route.params

  const fetch = useCallback(async () => {
    const response = await API.getAllByPost(postId)

    if (!response) {
      return
    }

    if ('statusCode' in response) {
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: response.message,
          okText: 'Ok',
        })
      )
      return
    }

    dispatch(CommentRTK.actions.setComment(response))
  }, [dispatch, postId])

  useEffect(() => {
    fetch()
  }, [dispatch, fetch, postId])

  const refreshData = async () => {
    setRefreshing(true)
    const response = await API.getAllByPost(postId)
    setRefreshing(false)

    if (response && !('statusCode' in response)) {
      dispatch(CommentRTK.actions.setComment(response))
    }
  }

  const toggleLike = (id: number, liked: boolean) => {
    if (liked) {
      dislikeComment(id)
    } else {
      likeComment(id)
    }
  }

  const likeComment = async (id: number) => {
    setLikeRefreshing(true)
    const response = await API.likeComment(id)
    if (!response) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      setLikeRefreshing(false)
      return
    }
    if ('statusCode' in response) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      setLikeRefreshing(false)
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: response.message,
          okText: 'Ok',
        })
      )
      return
    }
    await fetch()
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    setLikeRefreshing(false)
  }

  const dislikeComment = async (id: number) => {
    setLikeRefreshing(true)
    const response = await API.dislikeComment(id)
    if (!response) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      setLikeRefreshing(false)
      return
    }
    if ('statusCode' in response) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      setLikeRefreshing(false)
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: response.message,
          okText: 'Ok',
        })
      )
      return
    }
    await fetch()
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    setLikeRefreshing(false)
  }

  const renderFeed = ({ item }: { item: CommentState }) => {
    const mainliked = item.LikeComment.length > 0

    const subComments = (comments: SubComment[]) => {
      return _.map(comments, subComment => {
        const subLiked = subComment.LikeComment.length > 0
        return (
          <SubRowView key={subComment.id}>
            <Avatar
              source={{ uri: `${baseImageUrl}/${subComment.Profile.avatar}` }}
              size={30}
            />
            <TextMessage main={false}>
              <TextUserName>{subComment.Profile.username} </TextUserName>
              {subComment.comment}
            </TextMessage>
            <IconButton
              icon={subLiked ? 'heart' : 'heart-outline'}
              color={subLiked ? theme.colors.error : theme.colors.text}
              onPress={_.debounce(
                () => toggleLike(subComment.id, subLiked),
                300
              )}
              disabled={likeRefreshing}
              animated={true}
              size={10}
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}
            />
          </SubRowView>
        )
      })
    }

    return (
      <>
        <RowView>
          <Avatar
            source={{ uri: `${baseImageUrl}/${item.Profile.avatar}` }}
            size={30}
          />
          <TextMessage main={true}>
            <TextUserName>{item.Profile.username} </TextUserName>
            {item.comment}
          </TextMessage>
          <IconButton
            icon={mainliked ? 'heart' : 'heart-outline'}
            color={mainliked ? theme.colors.error : theme.colors.text}
            onPress={_.debounce(() => toggleLike(item.id, mainliked), 300)}
            animated={true}
            size={10}
            disabled={likeRefreshing}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}
          />
        </RowView>
        {subComments(item.Comment)}
      </>
    )
  }

  return (
    <Container>
      <FlatList
        data={comment}
        renderItem={item => renderFeed(item)}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <Divider />}
        onRefresh={refreshData}
        refreshing={refreshing}
      />
    </Container>
  )
}

export default CommentView
