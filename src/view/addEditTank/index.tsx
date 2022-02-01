import React, { useEffect } from 'react'
import { Platform, View, LayoutAnimation } from 'react-native'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import { TouchableRipple, Text } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import { Image } from 'react-native-compressor'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'
import forEach from 'lodash/forEach'
import find from 'lodash/find'
import map from 'lodash/map'
import replace from 'lodash/replace'
import filter from 'lodash/filter'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import * as Haptics from 'expo-haptics'

import { CreateParams } from '../../API/tank/types'
import ConfigRTK from '../../store/config'
import Header from './components/header'
import TankMeasurement from '../../assets/tankMeasurement.png'
import LoadingScreen from '../components/fakeLoadingScreen'
import { fullImageUrl } from '../../services/helper'
import Input from '../components/input'
import { NavPropsAddEditTank } from '../../routes/types'
import theme from '../../theme'
import * as API from '../../API/tank'
import {
  formValidation,
  FormData,
  FertilizerListType,
  PlantListType,
} from './types'
import {
  PaperKeyboardAvoidingView,
  Container,
  SubmitButton,
  RowView,
  TankThumbImage,
  FullView,
  LengthRowView,
  SmallText,
  TankMeasurementImage,
  FlatListText,
  StripFlatList,
  Icon,
  ThumbImageList,
  CameraIcon,
  CameraIconBkg,
  ErrorText,
  DeleteButton,
} from './styles'

const AddEditTank: React.FC<NavPropsAddEditTank> = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [tankImage, setTankImage] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [showDatePicker, setShowDatePicker] = React.useState(false)
  const [fertilizers, setFertilizers] = React.useState<FertilizerListType[]>([])
  const [plants, setPlants] = React.useState<PlantListType[]>([])
  const tank = route.params.tank
  const initialValues = tank
    ? {
        name: tank.name || '',
        description: tank.description || '',
        born: moment(tank.born || undefined).format('YYYY-MM-DD'),
        height: tank.height ? tank.height.toString() : '',
        width: tank.width ? tank.width.toString() : '',
        length: tank.length ? tank.length.toString() : '',
        avatar: tank.avatar ? tank.avatar.toString() : '',
        co2: tank.co2 ? tank.co2.toString() : '',
        dayLight: tank.dayLight ? tank.dayLight.toString() : '',
        filter: tank.filter ? tank.filter.toString() : '',
        substrate: tank.substrate ? tank.substrate.toString() : '',
        light: tank.light ? tank.light.toString() : '',
        country: tank.location ? tank.location.toString() : '',
      }
    : {
        name: '',
        description: '',
        born: moment().format('YYYY-MM-DD'),
        height: '',
        width: '',
        length: '',
        avatar: '',
        co2: '',
        dayLight: '',
        filter: '',
        substrate: '',
        light: '',
        country: '',
      }

  useEffect(() => {
    navigation.setOptions({
      title: route.params.tank ? 'Update Tank' : 'New Tank',
    })
    if (route.params.tank) {
      const pushFertilizers: FertilizerListType[] = []
      forEach(route.params.tank.TankFertilizer, fertilizer => {
        pushFertilizers.push({
          id: fertilizer.Fertilizer.id,
          name: fertilizer.Fertilizer.name,
          dose: fertilizer.amount.toString(),
          avatar: fertilizer.Fertilizer.avatar,
        })
      })
      setFertilizers(pushFertilizers)
      const pushPlants: PlantListType[] = []
      forEach(route.params.tank.TankPlant, plant => {
        pushPlants.push({
          avatar: plant.Plant.avatar,
          id: plant.Plant.id,
          name: plant.Plant.name,
        })
      })
      setPlants(pushPlants)
    }
  }, [navigation, route.params.tank])
  useEffect(() => {
    if (route.params.plants) {
      const plantToAdd = route.params.plants
      if (plants.length > 0 && !!find(plants, { id: plantToAdd.id })) {
        dispatch(
          ConfigRTK.actions.setAlert({
            visible: true,
            alertTitle: 'Oops!',
            alertMessage: `You already have ${plantToAdd.name} added to your tank`,
            okText: 'Ok',
          })
        )
        return
      }
      setPlants([...plants, route.params.plants])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params.plants])
  useEffect(() => {
    if (route.params.fertilizers) {
      const fertilizerToAdd = route.params.fertilizers
      if (
        fertilizers.length > 0 &&
        !!find(fertilizers, { id: fertilizerToAdd.id })
      ) {
        dispatch(
          ConfigRTK.actions.setAlert({
            visible: true,
            alertTitle: 'Oops!',
            alertMessage: `You already have ${fertilizerToAdd.name} added to your tank`,
            okText: 'Ok',
          })
        )
        return
      }
      setFertilizers([...fertilizers, route.params.fertilizers])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params.fertilizers])

  const upsertTank = async (values: FormData) => {
    setIsLoading(true)
    dispatch(
      ConfigRTK.actions.setLoading({
        visible: true,
        loadingMessage: 'Saving...',
      })
    )
    const validPlants = map(plants, plant => {
      return { plantId: Number(plant.id) }
    })
    const validFertilizers = map(fertilizers, fertilizer => {
      return {
        fertilizerId: Number(fertilizer.id),
        amount: Number(fertilizer.dose),
      }
    })
    const validValues: CreateParams = {
      plants: validPlants,
      ferts: validFertilizers,
      height: Number(values.height),
      width: Number(values.width),
      length: Number(values.length),
      co2: Number(values.co2),
      name: values.name,
      born: moment(values.born).format(),
      light: values.light,
      substrate: values.substrate,
      location: values.country,
      avatar: tankImage,
      filter: values.filter,
      dayLight: Number(values.dayLight),
    }
    if (!tank) {
      // create tank
      const response = await API.createTank(validValues)
      if (!response) {
        dispatch(
          ConfigRTK.actions.setAlert({
            visible: true,
            alertTitle: 'Oops!',
            alertMessage: 'Something went wrong, try again',
            okText: 'Ok',
          })
        )
        dispatch(
          ConfigRTK.actions.setLoading({
            visible: false,
          })
        )
        setIsLoading(false)
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
        dispatch(
          ConfigRTK.actions.setLoading({
            visible: false,
          })
        )
        setIsLoading(false)
        return
      }
      dispatch(
        ConfigRTK.actions.setLoading({
          visible: false,
        })
      )
      setIsLoading(false)
      navigation.navigate('Tank', { refresh: moment().toString() })
    } else {
      // update tank
      validValues.avatar = undefined
      const response = await API.updateTank(tank.id, validValues)
      if (!response) {
        dispatch(
          ConfigRTK.actions.setAlert({
            visible: true,
            alertTitle: 'Oops!',
            alertMessage: 'Something went wrong, try again',
            okText: 'Ok',
          })
        )
        dispatch(
          ConfigRTK.actions.setLoading({
            visible: false,
          })
        )
        setIsLoading(false)
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
        dispatch(
          ConfigRTK.actions.setLoading({
            visible: false,
          })
        )
        setIsLoading(false)
        return
      }
      dispatch(
        ConfigRTK.actions.setLoading({
          visible: false,
        })
      )
      setIsLoading(false)
      navigation.navigate('Tank', { refresh: moment().toString() })
    }
  }

  const takePicture = async () => {
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
      const compressed = await Image.compress(result.uri, {
        returnableOutputType: 'base64',
        compressionMethod: 'auto',
        maxHeight: 1280,
        maxWidth: 1280,
      })
      if (tank) {
        dispatch(
          ConfigRTK.actions.setLoading({
            visible: true,
            loadingMessage: 'Uploading Photo...',
          })
        )
        const response = await API.updatePhoto(tank.id, {
          avatar: replace(compressed, /\s/g, ''),
        })
        if (!response) {
          dispatch(
            ConfigRTK.actions.setAlert({
              visible: true,
              alertTitle: 'Oops!',
              alertMessage: 'Something went wrong, try again',
              okText: 'Ok',
            })
          )
          dispatch(
            ConfigRTK.actions.setLoading({
              visible: false,
            })
          )
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
          dispatch(
            ConfigRTK.actions.setLoading({
              visible: false,
            })
          )
          return
        }
        dispatch(
          ConfigRTK.actions.setLoading({
            visible: false,
          })
        )
      }
      setTankImage(compressed)
    }
  }

  const removeFertilizer = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setFertilizers(filter(fertilizers, item => item.id !== id))
  }
  const removePlant = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setPlants(filter(plants, item => item.id !== id))
  }

  const renderRightActions = (fnDelete: CallableFunction) => {
    return (
      <DeleteButton
        onPress={() => fnDelete()}
        rippleColor={theme.colors.onSurface}
      >
        <Icon icon="delete-outline" color={theme.colors.surface} />
      </DeleteButton>
    )
  }
  const renderFertilizerList = () => {
    return map(fertilizers, (fertilizer, index) => (
      <Swipeable
        renderRightActions={() =>
          renderRightActions(() => removeFertilizer(fertilizer.id))
        }
        onActivated={() =>
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        }
        key={`fert-${index}`}
      >
        <StripFlatList>
          <RowView>
            <ThumbImageList
              source={fullImageUrl(fertilizer.avatar)}
              resizeMode="contain"
            />
            <FlatListText>{fertilizer.name}</FlatListText>
          </RowView>
        </StripFlatList>
      </Swipeable>
    ))
  }

  const renderPlantList = () => {
    return map(plants, (plant, index) => (
      <Swipeable
        renderRightActions={() =>
          renderRightActions(() => removePlant(plant.id))
        }
        onActivated={() =>
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        }
        key={`plant-${index}`}
      >
        <StripFlatList>
          <RowView>
            <ThumbImageList
              source={fullImageUrl(plant.avatar)}
              resizeMode="contain"
            />
            <FlatListText>{plant.name}</FlatListText>
          </RowView>
        </StripFlatList>
      </Swipeable>
    ))
  }

  if (initialValues === undefined) {
    return <LoadingScreen />
  }
  return (
    <Container>
      <PaperKeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 92 : 0}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={values => upsertTank(values)}
          validationSchema={formValidation}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            handleSubmit,
            setFieldValue,
          }) => (
            <>
              <RowView>
                <TouchableRipple onPress={() => takePicture()}>
                  <View>
                    <TankThumbImage
                      source={
                        route.params.tank && !tankImage
                          ? fullImageUrl(values.avatar)
                          : tankImage
                          ? { uri: `data:image/jpeg;base64,${tankImage}` }
                          : fullImageUrl('')
                      }
                    />
                    <CameraIconBkg>
                      <CameraIcon
                        icon="plus-box-multiple"
                        color={theme.colors.surface}
                        onPress={() => takePicture()}
                      />
                    </CameraIconBkg>
                  </View>
                </TouchableRipple>
                <FullView>
                  <Input
                    label="Tank name"
                    onChangeText={handleChange('name')}
                    onBlur={() => setFieldTouched('name')}
                    value={values.name}
                    error={
                      touched.name && errors.name ? errors.name : undefined
                    }
                  />
                  <RowView>
                    <Text>
                      Birth day {Platform.OS === 'android' && values.born}
                      <ErrorText>
                        {touched.born && errors.born ? errors.born : ''}
                      </ErrorText>
                    </Text>
                    {Platform.OS === 'android' && (
                      <Icon
                        icon="calendar"
                        onPress={() => setShowDatePicker(true)}
                        size={19}
                        color={theme.colors.primary}
                      />
                    )}
                    {(Platform.OS === 'ios' || showDatePicker) && (
                      <FullView>
                        <DateTimePicker
                          value={moment(values.born || undefined).toDate()}
                          mode="date"
                          display={
                            Platform.OS === 'ios' ? 'compact' : 'calendar'
                          }
                          onChange={(
                            e: any,
                            selectedDate: Date | undefined
                          ) => {
                            setShowDatePicker(false)
                            setFieldValue(
                              'born',
                              moment(selectedDate).format('YYYY-MM-DD')
                            )
                          }}
                        />
                      </FullView>
                    )}
                  </RowView>
                </FullView>
              </RowView>
              <RowView>
                <View>
                  <LengthRowView>
                    <FullView>
                      <Input
                        label="Height"
                        keyboardType="number-pad"
                        onChangeText={handleChange('height')}
                        onBlur={() => setFieldTouched('height')}
                        value={values.height}
                        error={
                          touched.height && errors.height
                            ? errors.height
                            : undefined
                        }
                      />
                    </FullView>
                    <SmallText>cm</SmallText>
                  </LengthRowView>
                  <LengthRowView>
                    <FullView>
                      <Input
                        label="Length"
                        keyboardType="number-pad"
                        onChangeText={handleChange('length')}
                        onBlur={() => setFieldTouched('length')}
                        value={values.length}
                        error={
                          touched.length && errors.length
                            ? errors.length
                            : undefined
                        }
                      />
                    </FullView>
                    <SmallText>cm</SmallText>
                  </LengthRowView>
                  <LengthRowView>
                    <FullView>
                      <Input
                        label="Width"
                        keyboardType="number-pad"
                        onChangeText={handleChange('width')}
                        onBlur={() => setFieldTouched('width')}
                        value={values.width}
                        error={
                          touched.width && errors.width
                            ? errors.width
                            : undefined
                        }
                      />
                    </FullView>
                    <SmallText>cm</SmallText>
                  </LengthRowView>
                </View>
                <TankMeasurementImage source={TankMeasurement} />
              </RowView>
              <RowView>
                <FullView>
                  <Input
                    label="CO2 level"
                    keyboardType="numeric"
                    onChangeText={handleChange('co2')}
                    onBlur={() => setFieldTouched('co2')}
                    value={values.co2}
                    error={touched.co2 && errors.co2 ? errors.co2 : undefined}
                  />
                </FullView>
                <SmallText marginRight>bubbles/sec</SmallText>
                <FullView>
                  <Input
                    label="Day light"
                    keyboardType="numeric"
                    onChangeText={handleChange('dayLight')}
                    onBlur={() => setFieldTouched('dayLight')}
                    value={values.dayLight}
                    error={
                      touched.dayLight && errors.dayLight
                        ? errors.dayLight
                        : undefined
                    }
                  />
                </FullView>
                <SmallText>hours/day</SmallText>
              </RowView>
              <Input
                label="Country"
                onChangeText={handleChange('country')}
                onBlur={() => setFieldTouched('country')}
                value={values.country}
                error={
                  touched.country && errors.country ? errors.country : undefined
                }
              />
              <Input
                label="Light (T5 4 x 45W High Lite Day)"
                onChangeText={handleChange('light')}
                onBlur={() => setFieldTouched('light')}
                value={values.light}
                error={touched.light && errors.light ? errors.light : undefined}
              />
              <Input
                label="Substrate (ADA Aqua Soil Amazonia)"
                onChangeText={handleChange('substrate')}
                onBlur={() => setFieldTouched('substrate')}
                value={values.substrate}
                error={
                  touched.substrate && errors.substrate
                    ? errors.substrate
                    : undefined
                }
              />
              <Input
                label="Filter OASE Indoor Aquatics Biomaster 250"
                onChangeText={handleChange('filter')}
                onBlur={() => setFieldTouched('filter')}
                value={values.filter}
                error={
                  touched.filter && errors.filter ? errors.filter : undefined
                }
              />
              <Header
                title="Add a Fertilizer"
                onPress={() =>
                  navigation.navigate('FertilizerList', {
                    tank: route.params.tank,
                  })
                }
              />
              {renderFertilizerList()}
              <Header
                title="Add a Plant"
                onPress={() =>
                  navigation.navigate('PlantList', { tank: route.params.tank })
                }
              />
              {renderPlantList()}
              <SubmitButton
                onPress={handleSubmit}
                mode="contained"
                loading={isLoading}
              >
                Save
              </SubmitButton>
            </>
          )}
        </Formik>
      </PaperKeyboardAvoidingView>
    </Container>
  )
}

export default AddEditTank
