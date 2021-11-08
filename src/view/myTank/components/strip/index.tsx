import React from 'react'
import moment from 'moment'

import { StripProps } from './types'
import { fullImageUrl } from '../../../../services/helper'
import { NavPropsTank } from 'routes/types'
import {
  TankView,
  TankHeaderView,
  TankHeaderThumb,
  TankHeaderDetailView,
  TankHeaderTitle,
  TankHeaderText,
  ChevronIcon,
  MainView,
} from './styles'

const Strip: React.FC<NavPropsTank & StripProps> = ({
  imageURL,
  title,
  createdAt,
  dimensions,
  tank,
  navigation,
}) => {
  return (
    <MainView
      onPress={() =>
        navigation.navigate('TankDetail', { tank, tankId: tank.id })
      }
      hasTVPreferredFocus={undefined}
      tvParallaxProperties={undefined}
    >
      <>
        <TankView>
          <TankHeaderView>
            <TankHeaderThumb source={fullImageUrl(imageURL)} />
            <TankHeaderDetailView>
              {!!title && <TankHeaderTitle>{title}</TankHeaderTitle>}
              {!!createdAt && (
                <TankHeaderText>{moment(createdAt).fromNow()}</TankHeaderText>
              )}
              {!!dimensions && (
                <TankHeaderText>{`${dimensions} cm`}</TankHeaderText>
              )}
            </TankHeaderDetailView>
          </TankHeaderView>
        </TankView>
        <ChevronIcon
          icon="chevron-right"
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
        />
      </>
    </MainView>
  )
}

export default Strip
