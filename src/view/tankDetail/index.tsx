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

const TankDetail: React.FC<NavPropsTankDetail> = ({ route }) => {
  const [tank, setTank] = React.useState<TankState | undefined>(undefined)

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
      <HeaderImage source={fullImageUrl(tank.avatar)} resizeMode="cover" />
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
      <RowView>
        <DetailIcon
          icon="molecule-co2"
          uppercase={false}
          color={theme.colors.text}
          compact
        >
          {tank.co2 ? `${tank.co2} bubbles/sec` : 'none'}
        </DetailIcon>
        <DetailIcon
          icon="ceiling-light"
          uppercase={false}
          color={theme.colors.text}
          compact
        >
          {tank.dayLight ? `${tank.dayLight} hours` : 'none'}
        </DetailIcon>
      </RowView>
      <RowView>
        <DetailIcon
          icon="water"
          uppercase={false}
          color={theme.colors.text}
          compact
        >
          {!!tank.width && !!tank.height && !!tank.length
            ? `${toInteger(
                (tank.width * tank.height * tank.length) / 1000
              )} litres`
            : 'none'}
        </DetailIcon>
        <DetailIcon
          icon="ruler-square"
          uppercase={false}
          color={theme.colors.text}
          compact
        >
          {!!tank.width && !!tank.height && !!tank.length
            ? `${tank.length}x${tank.width}x${tank.height} cm`
            : 'none'}
        </DetailIcon>
      </RowView>
      {!!tank.filter && (
        <PaperText>
          {'Filter '}
          <PaperBoldText>{tank.filter}</PaperBoldText>
        </PaperText>
      )}
      {!!tank.substrate && (
        <PaperText>
          {'substrate '}
          <PaperBoldText>{tank.substrate}</PaperBoldText>
        </PaperText>
      )}
      {!!tank.light && (
        <PaperText>
          {'Light '}
          <PaperBoldText>{tank.light}</PaperBoldText>
        </PaperText>
      )}
      {renderPlantList()}
      {renderFertilizerList()}
    </StyledScrollView>
  )
}

export default TankDetail
