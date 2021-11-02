import React from 'react'
import { Button, IconButton } from 'react-native-paper'
import _ from 'lodash'

import theme from '../../../../theme'
import { FooterProps } from './types'
import * as API from '../../../../API/feed'
import { RowView, Text } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import ConfigRTK from '../../../../store/config'
import FeedRTK from '../../../../store/feed'

const Footer: React.FC<FooterProps> = ({
  liked,
  likes,
  comments,
  tankId,
  navigation,
  feedId,
}) => {
  const dispatch = useDispatch()
  const feeds = useSelector((state: RootState) => state.feed)
  const user = useSelector((state: RootState) => state.user)

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
    feeds[postIndex].LikePost = [
      {
        postId: feedId,
        profileId: user.profileId,
      },
    ]
    feeds[postIndex]._count.LikePost = feeds[postIndex]._count.LikePost + 1
    dispatch(FeedRTK.actions.setFeed([...feeds]))

    const response = await API.likePost(feedId)
    if (!response) {
      return
    }
    if ('statusCode' in response) {
      feeds[postIndex].LikePost = []
      feeds[postIndex]._count.LikePost = feeds[postIndex]._count.LikePost - 1
      dispatch(FeedRTK.actions.setFeed([...feeds]))

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
  }

  const dislikePost = async () => {
    const response = await API.dislikePost(feedId)
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

    const postIndex = _.findIndex(feeds, { id: feedId })
    feeds[postIndex].LikePost = []
    feeds[postIndex]._count.LikePost = feeds[postIndex]._count.LikePost - 1
    dispatch(FeedRTK.actions.setFeed([...feeds]))
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
            onPress={_.debounce(toggleLike, 500, { trailing: true })}
            animated={true}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}
          />
          <IconButton
            icon="comment-outline"
            color={theme.colors.text}
            onPress={() => navigation.navigate('Feed')}
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
            onPress={() => null}
          >
            tank spec
          </Button>
        )}
      </RowView>
      <Text>{textLikes}</Text>
      <Text>{textComments}</Text>
    </>
  )
}

export default Footer
