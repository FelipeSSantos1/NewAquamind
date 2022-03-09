import React from 'react'
import { Portal } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native'

import { RootState } from '../../../store/rootReducer'
import ConfigRTK from '../../../store/config'
import { DialogContent, Spinner, Text, DialogView } from './styles'

/**
 * sample how to call it
  dispatch(setLoading(true, 'Message'))
 */

const Loading: React.FC = () => {
  const dispatch = useDispatch()
  const config = useSelector((state: RootState) => state.config)

  return (
    <Portal>
      <DialogView
        visible={config.loading.visible}
        onDismiss={() => dispatch(ConfigRTK.actions.setLoading({ visible: false }))}
      >
        <DialogContent>
          <View>
            <Spinner />
            <Text>{config.loading.loadingMessage}</Text>
          </View>
        </DialogContent>
      </DialogView>
    </Portal>
  )
}

export default Loading
