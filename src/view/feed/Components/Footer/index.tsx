import React from 'react'
import { Button, IconButton } from 'react-native-paper'
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
}) => {
  const dispatch = useDispatch()
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
        {tankId && (
          <Button
            icon="fishbowl-outline"
            mode="text"
            color={theme.colors.text}
            compact
            uppercase={false}
            onPress={() => navigation.navigate('PostDetail', { tankId })}
          >
            tank spec
          </Button>
        )}
      </RowView>
      {!!description && (
        <Text>
          <TextUserName>{username} </TextUserName>
          {description}
        </Text>
      )}
      <Text>{textLikes}</Text>
      <Text>{textComments}</Text>
    </>
  )
}

export default Footer
