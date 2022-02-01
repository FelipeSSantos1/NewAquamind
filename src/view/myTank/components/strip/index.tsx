import React from 'react'
import moment from 'moment'
import { Divider } from 'react-native-paper'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import * as Haptics from 'expo-haptics'

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
  DeleteButton,
  UpdateButton,
  Icon,
  Arrow,
  ActionView,
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
}) => {
  const renderRightActions = () => {
    return (
      <ActionView>
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
      </ActionView>
    )
  }
  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onActivated={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
    >
      <Container>
        <MainView
          onPress={() =>
            navigation.navigate('TankDetail', { tank, tankId: tank.id })
          }
        >
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
              <Arrow icon="chevron-right" />
            </TankHeaderView>
          </TankView>
        </MainView>
        <Divider />
      </Container>
    </Swipeable>
  )
}

export default Strip
