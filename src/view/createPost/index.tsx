import React, { useEffect } from 'react'
import { Platform, LayoutAnimation } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import filter from 'lodash/filter'
import map from 'lodash/map'
import replace from 'lodash/replace'
import { Image } from 'react-native-compressor'

import { RootState } from '../../store/rootReducer'
import ConfigRTK from '../../store/config'
import TankRTK from '../../store/tank'
import FeedRTK from '../../store/feed'
import { NavPropsCreatePost } from 'routes/types'
import ImageBox from './components/imageBox'
import * as API from '../../API/tank'
import * as FeedAPI from '../../API/feed'
import theme from '../../theme'
import { ImageObject } from './types'
import {
  Container,
  ImageScrollView,
  Content,
  PaperTextInput,
  PaperPickerLabel,
  StyledPicker,
  SaveButon,
  PaperKeyboardAvoidingView,
} from './styles'

const CreatePost: React.FC<NavPropsCreatePost> = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const [images, setImages] = React.useState<typeof route.params.photo[]>([])
  const { tank } = useSelector((state: RootState) => state)
  const [selectedTank, setSelectedTank] = React.useState(0)
  const [textDescription, setTextDescription] = React.useState<string>('')

  useEffect(() => {
    const { photo } = route.params
    setImages([photo])
    dispatch(TankRTK.actions.logout())
    const fetchTank = async () => {
      const response = await API.getAllByUser()

      if (!response || 'statusCode' in response) {
        return
      }

      dispatch(TankRTK.actions.setTank(response))
    }
    fetchTank()
  }, [dispatch, route.params])

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: 'We need media roll permissions to make this work!',
          okText: 'Ok',
        })
      )
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.cancelled) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      setImages([...images, { uri: result.uri, height: result.height, width: result.width }])
    }
  }

  const renderImages = () => {
    const removeImage = (selectedImage: string) => {
      const newImages = filter(images, image => {
        return image.uri !== selectedImage
      })
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      setImages(newImages)
    }

    return map(images, (image, index) => (
      <ImageBox key={index} imageUrl={image.uri} onPress={() => removeImage(image.uri)} />
    ))
  }

  const createPost = async () => {
    if (images.length === 0) {
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: 'Please add at least one image!',
          okText: 'Ok',
        })
      )
      return
    }
    dispatch(
      ConfigRTK.actions.setLoading({
        visible: true,
        loadingMessage: 'Processing Images',
      })
    )
    const compressedImages: ImageObject[] = []
    for (const image of images) {
      const compressed = await Image.compress(image.uri, {
        returnableOutputType: 'base64',
        compressionMethod: 'auto',
        maxHeight: 1280,
        maxWidth: 1280,
      })

      compressedImages.push({
        image: replace(compressed, /\s/g, ''),
        height: image.height,
        width: image.width,
      })
    }
    dispatch(
      ConfigRTK.actions.setLoading({
        visible: true,
        loadingMessage: 'Uploading Images',
      })
    )
    const response = await FeedAPI.createPost({
      description: textDescription,
      tankId: selectedTank ? selectedTank : undefined,
      photos: compressedImages,
    })

    if (!response) {
      dispatch(
        ConfigRTK.actions.setLoading({
          visible: false,
          loadingMessage: '',
        })
      )
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: 'Something went wrong!',
          okText: 'Ok',
        })
      )
      return
    }
    if ('statusCode' in response) {
      dispatch(
        ConfigRTK.actions.setLoading({
          visible: false,
          loadingMessage: '',
        })
      )
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

    // refreshing feed state
    dispatch(
      ConfigRTK.actions.setLoading({
        visible: true,
        loadingMessage: 'Refreshing Feed',
      })
    )
    const feedResponse = await FeedAPI.getAllFeed({
      take: 10,
      cursor: 0,
    })

    if (feedResponse && !('statusCode' in feedResponse)) {
      dispatch(FeedRTK.actions.setFeed(feedResponse))

      if (feedResponse.length) {
        dispatch(ConfigRTK.actions.setFeedCursor(feedResponse[feedResponse.length - 1].id))
      }
    }

    dispatch(
      ConfigRTK.actions.setLoading({
        visible: false,
        loadingMessage: '',
      })
    )

    navigation.goBack()
  }

  return (
    <PaperKeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 92 : 0}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Container showsVerticalScrollIndicator={false}>
        <ImageScrollView horizontal showsHorizontalScrollIndicator={false}>
          {renderImages()}
          <ImageBox onPress={pickImage} />
        </ImageScrollView>
        <Content>
          <PaperTextInput
            placeholder="Add a description..."
            multiline={true}
            numberOfLines={5}
            mode="outlined"
            value={textDescription}
            onChangeText={setTextDescription}
            autoComplete="off"
          />
          {tank.length > 0 && (
            <>
              <PaperPickerLabel>Select a tank</PaperPickerLabel>
              <StyledPicker
                style={{ backgroundColor: theme.colors.background }}
                selectedValue={selectedTank}
                onValueChange={itemValue => setSelectedTank(itemValue as number)}
              >
                <StyledPicker.Item key={0} label="none" value={0} />
                {map(tank, currentTank => (
                  <StyledPicker.Item
                    key={currentTank.id}
                    label={currentTank.name}
                    value={currentTank.id}
                  />
                ))}
              </StyledPicker>
            </>
          )}
          <SaveButon mode="contained" icon="publish" onPress={createPost}>
            Publish it
          </SaveButon>
        </Content>
      </Container>
    </PaperKeyboardAvoidingView>
  )
}

export default CreatePost
