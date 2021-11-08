import React from 'react'
import moment from 'moment'

import { StripProps } from './types'
import { fullImageUrl } from '../../../../services/helper'
import {
  RowView,
  TankView,
  TankHeaderView,
  TankHeaderThumb,
  TankHeaderDetailView,
  TankHeaderTitle,
  TankHeaderText,
  ChevronIcon,
} from './styles'

const Strip: React.FC<StripProps> = ({
  imageURL,
  title,
  createdAt,
  dimensions,
}) => {
  return (
    <RowView>
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
    </RowView>
  )
}

export default Strip
