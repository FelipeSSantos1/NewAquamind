import React from 'react'
import moment from 'moment'

import { baseImageUrl } from '../../../../services/constant'
import { StripProps } from './types'
import AvatarImg from '../../../../assets/Avatar.png'
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
          <TankHeaderThumb
            source={
              imageURL ? { uri: `${baseImageUrl}/${imageURL}` } : AvatarImg
            }
          />
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
