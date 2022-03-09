import React from 'react'

import { FooterProps } from './types'
import { Divider } from 'react-native-paper'
import { RowView, Text, TextUserName, TextDescription } from './styles'

const Footer: React.FC<FooterProps> = ({ likes, comments, description, username }) => {
  const [textLikes, setTextLikes] = React.useState('no likes')
  const [textComments, setTextComments] = React.useState('no comments')

  React.useEffect(() => {
    if (likes > 1) {
      setTextLikes(`${likes} likes`)
      return
    }
    if (likes === 1) {
      setTextLikes(`${likes} like`)
      return
    }
    setTextLikes('no likes')
  }, [likes])
  React.useEffect(() => {
    if (comments > 1) {
      setTextComments(`${comments} comments`)
      return
    }
    if (comments === 1) {
      setTextComments(`${comments} comment`)
      return
    }
    setTextComments('no comments')
  }, [comments])

  return (
    <>
      {!!description && (
        <TextDescription>
          <TextUserName>{username} </TextUserName>
          {description}
        </TextDescription>
      )}
      <RowView>
        <Text>{textLikes}</Text>
        <Text>{textComments}</Text>
      </RowView>
      <Divider />
    </>
  )
}

export default Footer
