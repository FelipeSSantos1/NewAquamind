import React from 'react'
import { Button, IconButton } from 'react-native-paper'

import theme from '../../../../theme'
import { FooterProps } from './types'
import { RowView, Text } from './styles'

const Footer: React.FC<FooterProps> = ({
  liked,
  likes,
  comments,
  tankId,
  navigation,
}) => {
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
  return (
    <>
      <RowView>
        <RowView>
          <IconButton
            icon={liked ? 'heart' : 'heart-outline'}
            color={liked ? theme.colors.error : theme.colors.text}
            onPress={() => navigation.navigate('Feed')}
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
