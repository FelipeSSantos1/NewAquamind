import React, { useEffect } from 'react'
import moment from 'moment'
import map from 'lodash/map'
import toInteger from 'lodash/toInteger'

import * as tankAPI from '../../API/tank'
import { fullImageUrl } from '../../services/helper'
import ImageBox from './imageBox'
import { NavPropsTankDetail } from 'routes/types'
import { TankState } from 'store/tank/types'
import LoadingScreen from '../components/fakeLoadingScreen'
import {
  HeaderImage,
  RowView,
  PaperText,
  PaperBoldText,
  PaperTitle,
  StyledScrollView,
  PaperAssetsText,
  PaperDivider,
  ImageIcon,
  RowViewIcon,
  RowViewIconContainer,
} from './styles'
import { Pressable, ScrollView } from 'react-native'

const TankDetail: React.FC<NavPropsTankDetail> = ({ route }) => {
  const [tank, setTank] = React.useState<TankState | undefined>(undefined)
  const [selectedPhoto, setSelectedPhoto] = React.useState('')

  useEffect(() => {
    if (route.params.tank) {
      setTank(route.params.tank)
      return
    }
    const getTank = async () => {
      const response = await tankAPI.getById(route.params.tankId)
      if (!response || 'statusCode' in response) {
        return
      }
      setTank(response)
    }
    getTank()
  }, [route.params.tank, route.params.tankId])

  const renderPhotos = () => {
    if (!tank || !tank.Posts[0].Photos.length) {
      return null
    }

    return (
      <>
        <PaperDivider />
        <PaperTitle>Photos</PaperTitle>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <RowView>
            {map(tank.Posts[0].Photos, photo => (
              <Pressable
                key={photo.id}
                onPress={() => {
                  setSelectedPhoto(photo.url)
                }}
              >
                <ImageBox imageUrl={photo.url} />
              </Pressable>
            ))}
          </RowView>
        </ScrollView>
      </>
    )
  }

  const renderPlantList = () => {
    if (!tank) {
      return null
    }
    if (tank.TankPlant.length === 0) {
      return null
    }
    return (
      <>
        <PaperDivider />
        <PaperTitle>Plant List</PaperTitle>
        {map(tank.TankPlant, (plant, index) => (
          <RowView key={`plant${index}`}>
            <ImageBox imageUrl={plant.Plant.avatar} />
            <PaperAssetsText>{plant.Plant.name}</PaperAssetsText>
          </RowView>
        ))}
      </>
    )
  }
  const renderFertilizerList = () => {
    if (tank && tank.TankFertilizer.length === 0) {
      return null
    }
    return (
      <>
        <PaperDivider />
        <PaperTitle>Fertilizer List</PaperTitle>
        {tank &&
          map(tank.TankFertilizer, (fertilizer, index) => (
            <RowView key={`plant${index}`}>
              <ImageBox imageUrl={fertilizer.Fertilizer.avatar} />
              <PaperAssetsText>
                {`${fertilizer.amount}${fertilizer.Fertilizer.unit} of ${fertilizer.Fertilizer.name}`}
              </PaperAssetsText>
            </RowView>
          ))}
        {/* fix android bottom margin */}
        <PaperTitle> </PaperTitle>
      </>
    )
  }

  if (!tank) {
    return <LoadingScreen />
  }

  return (
    <StyledScrollView showsVerticalScrollIndicator={false}>
      <HeaderImage
        source={
          selectedPhoto
            ? fullImageUrl(selectedPhoto)
            : fullImageUrl(tank.avatar)
        }
        resizeMode="cover"
      />
      {!!tank.name && <PaperTitle>{tank.name}</PaperTitle>}
      {!!tank.born && (
        <PaperText>
          {'Created on '}
          <PaperBoldText>
            {moment(tank.born).format('dddd, MMMM Do YYYY')}
          </PaperBoldText>
          {!!tank.location && (
            <>
              {' in '}
              <PaperBoldText>{tank.location}</PaperBoldText>
            </>
          )}
        </PaperText>
      )}
      <RowViewIconContainer>
        <RowViewIcon>
          <ImageIcon source={require('../../assets/icons/co2.png')} />
          <PaperText>{tank.co2 ? `${tank.co2} bubbles/sec` : 'none'}</PaperText>
        </RowViewIcon>
        <RowViewIcon>
          <ImageIcon source={require('../../assets/icons/day-and-night.png')} />
          <PaperText>
            {tank.dayLight ? `${tank.dayLight} hours` : 'none'}
          </PaperText>
        </RowViewIcon>
      </RowViewIconContainer>
      <RowViewIconContainer>
        <RowViewIcon>
          <ImageIcon source={require('../../assets/icons/liter.png')} />
          <PaperText>
            {!!tank.width && !!tank.height && !!tank.length
              ? `${toInteger(
                  (tank.width * tank.height * tank.length) / 1000
                )} litres`
              : 'none'}
          </PaperText>
        </RowViewIcon>
        <RowViewIcon>
          <ImageIcon source={require('../../assets/icons/measure.png')} />
          <PaperText>
            {!!tank.width && !!tank.height && !!tank.length
              ? `${tank.length}x${tank.width}x${tank.height} cm`
              : 'none'}
          </PaperText>
        </RowViewIcon>
      </RowViewIconContainer>
      {!!tank.filter && (
        <RowViewIconContainer>
          <RowViewIcon>
            <ImageIcon source={require('../../assets/icons/waterFilter.png')} />
            <PaperText>{tank.filter}</PaperText>
          </RowViewIcon>
        </RowViewIconContainer>
      )}
      {!!tank.substrate && (
        <RowViewIconContainer>
          <RowViewIcon>
            <ImageIcon source={require('../../assets/icons/soil.png')} />
            <PaperText>{tank.substrate}</PaperText>
          </RowViewIcon>
        </RowViewIconContainer>
      )}
      {!!tank.light && (
        <RowViewIconContainer>
          <RowViewIcon>
            <ImageIcon source={require('../../assets/icons/light.png')} />
            <PaperText>{tank.light}</PaperText>
          </RowViewIcon>
        </RowViewIconContainer>
      )}
      {renderPhotos()}
      {renderPlantList()}
      {renderFertilizerList()}
    </StyledScrollView>
  )
}

export default TankDetail
