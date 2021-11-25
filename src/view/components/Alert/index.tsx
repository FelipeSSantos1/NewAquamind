import React from 'react'
import { Portal, Dialog, Paragraph } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import trim from 'lodash/trim'

import { RootState } from '../../../store/rootReducer'
import ConfigRTK from '../../../store/config'
import theme from '../../../theme'

import { Button } from './styles'

/**
 * Sample how to call it
 *
  dispatch(
    setAlert({
      visible: true,
      alertTitle: 'Delete Photo',
      alertMessage: 'Are you sure that you want to delete this photo?',
      cancelText: 'Cancel',
    }),
  )
 */

const Alert: React.FC = () => {
  const dispatch = useDispatch()
  const config = useSelector((state: RootState) => state.config)

  return (
    <Portal>
      <Dialog
        visible={config.alert.visible}
        onDismiss={() => dispatch(ConfigRTK.actions.hideAlert())}
      >
        <Dialog.Title>{config.alert.alertTitle || 'Alert'}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{config.alert.alertMessage}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          {!isEmpty(trim(config.alert.cancelText)) && (
            <Button
              color={theme.colors.error}
              onPress={() => dispatch(ConfigRTK.actions.hideAlert())}
            >
              {trim(config.alert.cancelText)}
            </Button>
          )}
          <Button
            onPress={() => {
              if (config.alert.okPress) {
                config.alert.okPress()
              }
              dispatch(ConfigRTK.actions.hideAlert())
            }}
          >
            {!isEmpty(trim(config.alert.okText))
              ? trim(config.alert.okText)
              : 'Done'}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default Alert
