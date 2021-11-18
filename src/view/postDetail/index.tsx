import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import _ from 'lodash'

import { GetPostByIdResponse } from '../../API/feed/types'
import FakeLoadingScreen from '../components/fakeLoadingScreen'
import FeedBox from './components/feedBox'
import Strip from './components/strip'
import { CommentState, SubComment } from '../../store/comment/types'
import { NavPropsPostDetail } from '../../routes/types'
import * as API from '../../API/feed'
import { Container } from './styles'
import { RootState } from 'store/rootReducer'

const PostDetail: React.FC<NavPropsPostDetail> = ({ route }) => {
  const [post, setPost] = useState<GetPostByIdResponse | undefined>()
  const { user } = useSelector((state: RootState) => state)

  const getPost = async (id: number) => {
    const response = await API.getById(id)

    if (!response || 'statusCode' in response) {
      return null
    }

    return response
  }

  useEffect(() => {
    if (route.params.postId) {
      getPost(route.params.postId).then(response => {
        if (response) {
          setPost(response)
        }
      })
    }
  }, [route.params.postId])

  if (!post) {
    return <FakeLoadingScreen />
  }

  const renderComments = ({ item }: { item: CommentState }) => {
    const subComments = (comments: SubComment[]) => {
      return _.map(comments, subComment => {
        return (
          <Strip
            key={subComment.id}
            item={subComment}
            sub={true}
            highlight={subComment.id === route.params.commentId}
          />
        )
      })
    }

    return (
      <>
        <Strip
          key={item.id}
          item={{ ...item }}
          sub={false}
          highlight={item.id === route.params.commentId}
        />
        {subComments(item.Comment)}
      </>
    )
  }

  return (
    <Container>
      <FlatList
        data={post.Comment}
        ListHeaderComponent={() => (
          <FeedBox
            key={post.id}
            feed={post}
            showHeader={post.profileId !== user.profileId}
            showFooter={!route.params.commentId}
          />
        )}
        renderItem={renderComments}
        keyExtractor={item => item.id.toString()}
      />
    </Container>
  )
}

export default PostDetail
