import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { baseImageUrl } from '../../services/constant'
import { NavPropsTankDetail } from '../../routes/types'
import TankRTK from '../../store/tank'
import * as tankAPI from '../../API/tank'
import { RootState } from 'store/rootReducer'
import LoadComponent from '../components/fakeLoadingScreen'
import ImageBox from './imageBox'
import {
  HeaderImage,
  DetailIcon,
  RowView,
  PaperText,
  PaperBoldText,
  PaperTitle,
  StyledScrollView,
  PaperAssetsText,
  PaperDivider,
} from './styles'
import theme from '../../theme'
import _ from 'lodash'

const TankDetail: React.FC<NavPropsTankDetail> = ({ route }) => {
  const dispatch = useDispatch()
  const { tank } = useSelector((state: RootState) => state)
  useEffect(() => {
    const fetch = async () => {
      dispatch(TankRTK.actions.logout())
      const response = await tankAPI.getById(route.params.tankId)

      if (!response || 'statusCode' in response) {
        return
      }

      dispatch(TankRTK.actions.setTank([response]))
    }
    fetch()
  }, [dispatch, route.params.tankId])

  if (tank.length === 0) {
    return <LoadComponent />
  }

  const renderPlantList = () => {
    if (tank[0].TankPlant.length === 0) {
      return null
    }
    return (
      <>
        <PaperDivider />
        <PaperTitle>Plant List</PaperTitle>
        {_.map(tank[0].TankPlant, (plant, index) => (
          <RowView key={`plant${index}`}>
            {!!plant.Plant.avatar && <ImageBox imageUrl={plant.Plant.avatar} />}
            <PaperAssetsText>{plant.Plant.name}</PaperAssetsText>
          </RowView>
        ))}
      </>
    )
  }
  const renderFertilizerList = () => {
    if (tank[0].TankFertilizer.length === 0) {
      return null
    }
    return (
      <>
        <PaperDivider />
        <PaperTitle>Fertilizer List</PaperTitle>
        {_.map(tank[0].TankFertilizer, (fertilizer, index) => (
          <RowView key={`plant${index}`}>
            {!!fertilizer.Fertilizer.avatar && (
              <ImageBox imageUrl={fertilizer.Fertilizer.avatar} />
            )}
            <PaperAssetsText>
              {`${fertilizer.amount}${fertilizer.Fertilizer.unit} of ${fertilizer.Fertilizer.name}`}
            </PaperAssetsText>
          </RowView>
        ))}
      </>
    )
  }

  return (
    <StyledScrollView>
      {tank[0].avatar ? (
        <HeaderImage
          source={{ uri: `${baseImageUrl}/${tank[0].avatar}` }}
          resizeMode="cover"
        />
      ) : (
        <HeaderImage
          source={require('../../assets/Avatar.png')}
          resizeMode="cover"
        />
      )}
      {!!tank[0].name && <PaperTitle>{tank[0].name}</PaperTitle>}
      {!!tank[0].born && (
        <PaperText>
          {'Created on '}
          <PaperBoldText>
            {moment(tank[0].born).format('dddd, MMMM Do YYYY')}
          </PaperBoldText>
          {!!tank[0].location && (
            <>
              {' in '}
              <PaperBoldText>{tank[0].location}</PaperBoldText>
            </>
          )}
        </PaperText>
      )}
      {!!tank[0].location && (
        <PaperText>
          {'in '}
          <PaperBoldText>{tank[0].location}</PaperBoldText>
        </PaperText>
      )}
      <RowView>
        <DetailIcon
          icon="molecule-co2"
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
          uppercase={false}
          color={theme.colors.text}
          compact
        >
          {tank[0].co2 ? `${tank[0].co2} bubbles/sec` : 'none'}
        </DetailIcon>
        <DetailIcon
          icon="ceiling-light"
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
          uppercase={false}
          color={theme.colors.text}
          compact
        >
          {tank[0].dayLight ? `${tank[0].dayLight} hours` : 'none'}
        </DetailIcon>
      </RowView>
      <RowView>
        <DetailIcon
          icon="water"
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
          uppercase={false}
          color={theme.colors.text}
          compact
        >
          {!!tank[0].width && !!tank[0].height && !!tank[0].length
            ? `${
                (tank[0].width * tank[0].height * tank[0].length) / 100
              } litres`
            : 'none'}
        </DetailIcon>
        <DetailIcon
          icon="ruler-square"
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
          uppercase={false}
          color={theme.colors.text}
          compact
        >
          {!!tank[0].width && !!tank[0].height && !!tank[0].length
            ? `${tank[0].length}x${tank[0].width}x${tank[0].height} cm`
            : 'none'}
        </DetailIcon>
      </RowView>
      {!!tank[0].filter && (
        <PaperText>
          {'Filter '}
          <PaperBoldText>{tank[0].filter}</PaperBoldText>
        </PaperText>
      )}
      {!!tank[0].gravel && (
        <PaperText>
          {'Gravel '}
          <PaperBoldText>{tank[0].gravel}</PaperBoldText>
        </PaperText>
      )}
      {!!tank[0].light && (
        <PaperText>
          {'Light '}
          <PaperBoldText>{tank[0].light}</PaperBoldText>
        </PaperText>
      )}
      {renderPlantList()}
      {renderFertilizerList()}
    </StyledScrollView>
  )
}

export default TankDetail
