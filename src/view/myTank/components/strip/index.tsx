import React from 'react'
import moment from 'moment'
import { Divider } from 'react-native-paper'

import { StripProps } from './types'
import { fullImageUrl } from '../../../../services/helper'
import { NavPropsTank } from 'routes/types'
import theme from '../../../../theme'
import {
  TankView,
  TankHeaderView,
  TankHeaderThumb,
  TankHeaderDetailView,
  TankHeaderTitle,
  TankHeaderText,
  MainView,
  Container,
  FooterView,
  SpecButton,
  DeleteButton,
  UpdateButton,
  Icon,
} from './styles'

const Strip: React.FC<NavPropsTank & StripProps> = ({
  imageURL,
  title,
  createdAt,
  dimensions,
  tank,
  navigation,
  loadingDelete,
  onDelete,
  onUpdate,
  actionActive,
  setActionActive,
}) => {
  return (
    <Container>
      <MainView onPress={() => setActionActive()}>
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
      </MainView>
      {actionActive && (
        <FooterView>
          <DeleteButton
            onPress={() => onDelete()}
            disabled={loadingDelete}
            rippleColor={theme.colors.onSurface}
          >
            <Icon
              compact
              uppercase={false}
              labelStyle={{ fontSize: theme.fonts.sizes.xxsmall }}
              icon="delete-outline"
              loading={loadingDelete}
            >
              Delete
            </Icon>
          </DeleteButton>
          <UpdateButton
            onPress={() => onUpdate()}
            rippleColor={theme.colors.onSurface}
          >
            <Icon
              compact
              uppercase={false}
              labelStyle={{ fontSize: theme.fonts.sizes.xxsmall }}
              icon="square-edit-outline"
            >
              Update
            </Icon>
          </UpdateButton>
          <SpecButton
            onPress={() =>
              navigation.navigate('TankDetail', { tank, tankId: tank.id })
            }
            rippleColor={theme.colors.onSurface}
          >
            <Icon
              compact
              uppercase={false}
              labelStyle={{ fontSize: theme.fonts.sizes.xxsmall }}
              icon="information-outline"
            >
              Spec
            </Icon>
          </SpecButton>
        </FooterView>
      )}
      <Divider />
    </Container>
  )
}

export default Strip
