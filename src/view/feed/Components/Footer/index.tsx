import React from 'react'

import theme from '../../../../theme'
import { RowView, Icon, Text } from './styles'

type FooterProps = {
  liked: boolean
  likes?: number
  comments?: number
}
export default ({ liked, likes, comments }: FooterProps) => {
  const numberLikes = likes || 0
  let textLikes = 'no likes'
  if (numberLikes > 1) {
    textLikes = `${numberLikes} likes`
  }
  if (numberLikes === 1) {
    textLikes = `${numberLikes} like`
  }

  const numberComments = comments || 0
  let textComments = 'no comments'
  if (numberComments > 1) {
    textComments = `${numberComments} comments`
  }
  if (numberComments === 1) {
    textComments = `${numberComments} comment`
  }
  return (
    <RowView>
      <Icon
        icon={liked ? 'heart' : 'heart-outline'}
        animated
        color={liked ? theme.colors.error : theme.colors.text}
        onPress={() => console.log('test')}
      />
      <Text>{textLikes}</Text>
      <Icon
        icon="comment-outline"
        animated
        onPress={() => console.log('test')}
      />
      <Text>{textComments}</Text>
    </RowView>
  )
}
