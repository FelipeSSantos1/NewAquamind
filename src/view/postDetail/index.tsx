import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { baseImageUrl } from '../../services/constant'
import { NavPropsPostDetail } from '../../routes/types'
import TankRTK from '../../store/tank'
import * as tankAPI from '../../API/tank'
import { RootState } from 'store/rootReducer'
import LoadComponent from '../components/fakeLoadingScreen'
import { HeaderImage, DetailIcon, RowView } from './styles'
import theme from '../../theme'

const PostDetail: React.FC<NavPropsPostDetail> = ({ route }) => {
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

  return (
    <ScrollView>
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
    </ScrollView>
  )
}

export default PostDetail
