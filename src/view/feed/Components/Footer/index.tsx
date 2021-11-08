import React from 'react'
import { Button, IconButton } from 'react-native-paper'
import { Pressable } from 'react-native'
import * as Haptics from 'expo-haptics'
import produce from 'immer'
import _ from 'lodash'

import theme from '../../../../theme'
import { FooterProps } from './types'
import * as API from '../../../../API/feed'
import { RowView, Text, TextUserName } from './styles'
import { useDispatch } from 'react-redux'
import ConfigRTK from '../../../../store/config'
import FeedRTK from '../../../../store/feed'

const Footer: React.FC<FooterProps> = ({
  liked,
  likes,
  comments,
  tankId,
  navigation,
  feedId,
  feeds,
  user,
  description,
  username,
  profileId,
}) => {
  const dispatch = useDispatch()
  const [deleting, setDeleting] = React.useState(false)
  let textLikes = 'no likes'
  if (likes > 1) {
    textLikes = `${likes} likes`
  }
  if (likes === 1) {
    textLikes = `${likes} like`
  }

  let textComments = 'no comments'
  if (comments > 1) {
    textComments = `${comments} comments`
  }
  if (comments === 1) {
    textComments = `${comments} comment`
  }

  const likePost = async () => {
    const postIndex = _.findIndex(feeds, { id: feedId })
    const newFeed = produce(feeds, draft => {
      draft[postIndex].LikePost = [
        {
          postId: feedId,
          profileId: user.profileId,
        },
      ]
      feeds[postIndex]._count.LikePost += 1
    })
    dispatch(FeedRTK.actions.logout())
    dispatch(FeedRTK.actions.setFeed(newFeed))

    const response = await API.likePost(feedId)
    if (!response) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      const newFeedError = produce(feeds, draft => {
        draft[postIndex].LikePost = []
        feeds[postIndex]._count.LikePost -= 1
      })
      dispatch(FeedRTK.actions.logout())
      dispatch(FeedRTK.actions.setFeed(newFeedError))
      return
    }
    if ('statusCode' in response) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      const newFeedError = produce(feeds, draft => {
        draft[postIndex].LikePost = []
        feeds[postIndex]._count.LikePost -= 1
      })
      dispatch(FeedRTK.actions.logout())
      dispatch(FeedRTK.actions.setFeed(newFeedError))

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
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  }

  const dislikePost = async () => {
    const postIndex = _.findIndex(feeds, { id: feedId })
    const newFeed = produce(feeds, draft => {
      draft[postIndex].LikePost = []
      feeds[postIndex]._count.LikePost -= 1
    })
    dispatch(FeedRTK.actions.logout())
    dispatch(FeedRTK.actions.setFeed(newFeed))

    const response = await API.dislikePost(feedId)
    if (!response) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      const newFeedError = produce(feeds, draft => {
        draft[postIndex].LikePost = [
          {
            postId: feedId,
            profileId: user.profileId,
          },
        ]
        feeds[postIndex]._count.LikePost += 1
      })
      dispatch(FeedRTK.actions.logout())
      dispatch(FeedRTK.actions.setFeed(newFeedError))
      return
    }
    if ('statusCode' in response) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      const newFeedError = produce(feeds, draft => {
        draft[postIndex].LikePost = [
          {
            postId: feedId,
            profileId: user.profileId,
          },
        ]
        feeds[postIndex]._count.LikePost += 1
      })
      dispatch(FeedRTK.actions.logout())
      dispatch(FeedRTK.actions.setFeed(newFeedError))

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
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  }

  const toggleLike = () => {
    if (liked) {
      dislikePost()
    } else {
      likePost()
    }
  }

  const handleDeletePost = () => {
    dispatch(
      ConfigRTK.actions.setAlert({
        visible: true,
        alertTitle: 'Delete Post',
        alertMessage: 'Are you sure you want to delete this post?',
        okText: 'Yes',
        cancelText: 'No',
        okPress: deletePost,
      })
    )
  }

  const deletePost = async () => {
    setDeleting(true)
    const postIndex = _.findIndex(feeds, { id: feedId })
    const response = await API.deletePost(feedId)
    setDeleting(false)
    if (!response) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      return
    }
    if ('statusCode' in response) {
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

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    const newFeedError = produce(feeds, draft => {
      _.pullAt(draft, [postIndex])
    })
    dispatch(FeedRTK.actions.setFeed(newFeedError))
  }

  return (
    <>
      <RowView>
        <RowView>
          <IconButton
            icon={liked ? 'heart' : 'heart-outline'}
            color={liked ? theme.colors.error : theme.colors.text}
            onPress={_.debounce(toggleLike, 300, { trailing: true })}
            animated={true}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}
          />
          <IconButton
            icon="comment-outline"
            color={theme.colors.text}
            onPress={() => navigation.navigate('Comment', { postId: feedId })}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}
          />
        </RowView>
        <RowView>
          {tankId && profileId !== user.profileId && (
            <Button
              icon="fishbowl-outline"
              mode="text"
              color={theme.colors.text}
              compact
              uppercase={false}
              onPress={() => navigation.navigate('TankDetail', { tankId })}
            >
              tank spec
            </Button>
          )}
          {profileId === user.profileId && (
            <Button
              icon="delete-circle"
              mode="text"
              color={theme.colors.text}
              compact
              uppercase={false}
              loading={deleting}
              disabled={deleting}
              onPress={() => handleDeletePost()}
            >
              delete
            </Button>
          )}
        </RowView>
      </RowView>
      {!!description && (
        <Text>
          <TextUserName>{username} </TextUserName>
          {description}
        </Text>
      )}
      <Text>{textLikes}</Text>
      <Pressable
        onPress={() => navigation.navigate('Comment', { postId: feedId })}
      >
        <Text>{textComments}</Text>
      </Pressable>
    </>
  )
}

export default Footer
