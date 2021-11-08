import React, { useEffect, useState, useCallback, useRef } from 'react'
import { FlatList, Platform, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Divider, IconButton } from 'react-native-paper'
import * as Haptics from 'expo-haptics'
import _ from 'lodash'

import { fullImageUrl } from '../../services/helper'
import ConfigRTK from '../../store/config'
import CommentRTK from '../../store/comment'
import * as API from '../../API/comment'
import { NavPropsComment } from '../../routes/types'
import { RootState } from 'store/rootReducer'
import { CommentState, SubComment } from '../../store/comment/types'
import Strip from './components/strip'
import theme from '../../theme'
import {
  Container,
  PaperTextInput,
  ContentContainerStyle,
  RowView,
  PaperAvatar,
  PaperKeyboardAvoidingView,
} from './styles'

const CommentView: React.FC<NavPropsComment> = ({ route }) => {
  const dispatch = useDispatch()
  const { comment, user } = useSelector((state: RootState) => state)
  const [refreshing, setRefreshing] = useState(false)
  const [likeRefreshing, setLikeRefreshing] = useState(false)
  const [textComment, setTextComment] = useState('')
  const [loadingAddComment, setLoadingAddComment] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [parentId, setParentId] = useState<number | undefined>(undefined)
  const inputTextRef = useRef<TextInput>(null)

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
    dispatch(CommentRTK.actions.logout())
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

  const replyHandler = (username: string, parentIdParam: number) => {
    setTextComment(`@${username} `)
    setParentId(parentIdParam)
    inputTextRef.current?.focus()
  }

  const deleteComment = async (id: number) => {
    setLoadingDelete(true)
    const response = await API.deleteComment(id)
    if (!response) {
      setLoadingDelete(false)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      return
    }
    if ('statusCode' in response) {
      setLoadingDelete(false)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
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
    setLoadingDelete(false)
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  }

  const renderFeed = ({ item }: { item: CommentState }) => {
    const mainliked = item.LikeComment.length > 0

    const subComments = (comments: SubComment[]) => {
      return _.map(comments, subComment => {
        const subLiked = subComment.LikeComment.length > 0
        return (
          <Strip
            key={subComment.id}
            item={subComment}
            deleteFunction={_.debounce(
              () => deleteComment(subComment.id),
              300,
              { leading: true }
            )}
            likeFunction={_.debounce(
              () => toggleLike(subComment.id, subLiked),
              300,
              { leading: true }
            )}
            replyFunction={_.debounce(
              () =>
                replyHandler(
                  subComment.Profile.username,
                  subComment.parentId || subComment.id
                ),
              300
            )}
            refreshing={likeRefreshing}
            deleteRefreshing={loadingDelete}
            sub={true}
            renderDelete={subComment.profileId === user.profileId}
          />
        )
      })
    }

    return (
      <>
        <Strip
          key={item.id}
          item={item}
          deleteFunction={_.debounce(() => deleteComment(item.id), 300, {
            leading: true,
          })}
          likeFunction={_.debounce(() => toggleLike(item.id, mainliked), 300, {
            leading: true,
          })}
          replyFunction={_.debounce(
            () => replyHandler(item.Profile.username, item.id),
            300
          )}
          refreshing={likeRefreshing}
          deleteRefreshing={loadingDelete}
          sub={false}
          renderDelete={item.profileId === user.profileId}
        />
        {subComments(item.Comment)}
      </>
    )
  }

  const addComment = async () => {
    setLoadingAddComment(true)
    const response = await API.addComment({
      postId,
      comment: _.replace(_.trim(textComment), /\r?\n|\r/, ''),
      parentId,
    })
    if (!response) {
      setLoadingAddComment(false)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      return
    }
    if ('statusCode' in response) {
      setLoadingAddComment(false)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
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
    setTextComment('')
    setParentId(undefined)
    setLoadingAddComment(false)
    inputTextRef.current?.blur()
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  }

  return (
    <PaperKeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 92 : 0}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Container>
        <FlatList
          data={comment}
          renderItem={item => renderFeed(item)}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <Divider />}
          onRefresh={refreshData}
          refreshing={refreshing}
          contentContainerStyle={ContentContainerStyle.flatlist}
        />
        <RowView>
          <PaperAvatar source={fullImageUrl(user.Profile.avatar)} size={40} />
          <PaperTextInput
            ref={inputTextRef}
            placeholder="Add a comment..."
            multiline={true}
            numberOfLines={5}
            mode="outlined"
            value={textComment}
            onChangeText={setTextComment}
          />
          <IconButton
            icon="arrow-up-circle"
            color={theme.colors.primary}
            onPress={_.debounce(() => addComment(), 300)}
            disabled={!textComment || loadingAddComment}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}
          />
        </RowView>
      </Container>
    </PaperKeyboardAvoidingView>
  )
}

export default CommentView
