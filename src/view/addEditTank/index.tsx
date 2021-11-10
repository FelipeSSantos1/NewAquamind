import React, { useEffect } from 'react'
import { Platform, View, LayoutAnimation } from 'react-native'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import { TouchableRipple } from 'react-native-paper'
import _ from 'lodash'

import ConfigRTK from '../../store/config'
import Header from './components/header'
import TankMeasurement from '../../assets/tankMeasurement.png'
import LoadingScreen from '../components/fakeLoadingScreen'
import { fullImageUrl } from '../../services/helper'
import Input from '../components/input'
import { NavPropsAddEditTank } from '../../routes/types'
import theme from '../../theme'
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
  RowViewSpaceBetween,
  ThumbImageList,
} from './styles'

const AddEditTank: React.FC<NavPropsAddEditTank> = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = React.useState(false)
  const [fertilizers, setFertilizers] = React.useState<FertilizerListType[]>([])
  const [plants, setPlants] = React.useState<PlantListType[]>([])
  const [initialValues, setInitialValues] = React.useState<FormData>({
    name: '',
    description: '',
    born: '',
    height: '',
    width: '',
    length: '',
    avatar: '',
    co2: '',
    dayLight: '',
    filter: '',
    gravel: '',
    light: '',
    location: '',
  })

  useEffect(() => {
    navigation.setOptions({
      title: route.params.tankId ? 'Update Tank' : 'New Tank',
    })
    if (route.params.tankId) {
      // it's an update flow
      // get tank from DB
    }
  }, [navigation, route.params.tankId])

  useEffect(() => {
    if (route.params.plants) {
      const plantToAdd = route.params.plants
      if (plants.length > 0 && !!_.find(plants, { id: plantToAdd.id })) {
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
        !!_.find(fertilizers, { id: fertilizerToAdd.id })
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
    console.log({ values })
    setIsLoading(false)
  }

  const takePicture = async () => {
    console.log('takePicture')
  }

  const removeFertilizer = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setFertilizers(_.filter(fertilizers, item => item.id !== id))
  }
  const removePlant = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setPlants(_.filter(plants, item => item.id !== id))
  }

  const renderFertilizerList = () => {
    return _.map(fertilizers, (fertilizer, index) => (
      <StripFlatList key={`fert-${index}`}>
        <RowViewSpaceBetween>
          <RowView>
            <ThumbImageList
              source={fullImageUrl(fertilizer.avatar)}
              resizeMode="contain"
            />
            <FlatListText>{fertilizer.name}</FlatListText>
          </RowView>
          <Icon
            icon="delete-outline"
            onPress={() => removeFertilizer(fertilizer.id)}
            color={theme.colors.error}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}
          />
        </RowViewSpaceBetween>
      </StripFlatList>
    ))
  }
  const renderPlantList = () => {
    return _.map(plants, (plant, index) => (
      <StripFlatList key={`fert-${index}`}>
        <RowViewSpaceBetween>
          <RowView>
            <ThumbImageList
              source={fullImageUrl(plant.avatar)}
              resizeMode="contain"
            />
            <FlatListText>{plant.name}</FlatListText>
          </RowView>
          <Icon
            icon="delete-outline"
            onPress={() => removePlant(plant.id)}
            color={theme.colors.error}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}
          />
        </RowViewSpaceBetween>
      </StripFlatList>
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
            isValid,
            handleSubmit,
          }) => (
            <>
              <RowView>
                <TouchableRipple
                  onPress={() => takePicture()}
                  hasTVPreferredFocus={undefined}
                  tvParallaxProperties={undefined}
                >
                  <TankThumbImage source={fullImageUrl(values.avatar)} />
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
                  <Input
                    label="Born date YYYY-MM-DD"
                    onChangeText={handleChange('born')}
                    onBlur={() => setFieldTouched('born')}
                    value={values.born}
                    error={
                      touched.born && errors.born ? errors.born : undefined
                    }
                  />
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
                label="Light (T5 4 x 45W High Lite Day)"
                onChangeText={handleChange('light')}
                onBlur={() => setFieldTouched('light')}
                value={values.light}
                error={touched.light && errors.light ? errors.light : undefined}
              />
              <Input
                label="Substrate (ADA Aqua Soil Amazonia)"
                onChangeText={handleChange('gravel')}
                onBlur={() => setFieldTouched('gravel')}
                value={values.gravel}
                error={
                  touched.gravel && errors.gravel ? errors.gravel : undefined
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
                onPress={() => navigation.navigate('FertilizerList')}
              />
              {renderFertilizerList()}
              <Header
                title="Add a Plant"
                onPress={() => navigation.navigate('PlantList')}
              />
              {renderPlantList()}
              <SubmitButton
                onPress={handleSubmit}
                mode="contained"
                disabled={!isValid || isLoading}
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
