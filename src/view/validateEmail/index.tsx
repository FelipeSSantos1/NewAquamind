import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import * as API from '../../API/user'
import ConfigRTK from '../../store/config'
import { NavPropsValidateEmail } from '../../routes/types'
import {
  Container,
  PaperTitle,
  Spinner,
  PaperButton,
  PaperIconButton,
  ReadyView,
} from './styles'

const ValidateEmail: React.FC<NavPropsValidateEmail> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch()
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (route.params) {
      const { token } = route.params
      if (token) {
        API.verifyEmail(token)
          .then(response => {
            if (!response) {
              setVerified(false)
              dispatch(
                ConfigRTK.actions.setAlert({
                  alertTitle: 'Oops',
                  alertMessage: 'Something went wrong',
                  visible: true,
                  okText: 'Ok',
                })
              )
              return
            }
            if ('statusCode' in response) {
              dispatch(
                ConfigRTK.actions.setAlert({
                  alertTitle: 'Oops',
                  alertMessage:
                    'Likelytly link has expired. Go to create account and click on the button below of main button to resend a new valid link',
                  visible: true,
                  okText: 'Ok',
                })
              )
              setVerified(false)
              return
            }
            setVerified(true)
          })
          .catch(() => {
            setVerified(false)
            dispatch(
              ConfigRTK.actions.setAlert({
                alertTitle: 'Oops',
                alertMessage: 'Something went wrong',
                visible: true,
                okText: 'Ok',
              })
            )
            return
          })
      }
    }
  }, [dispatch, route.params])

  return (
    <Container>
      {!verified && (
        <ReadyView>
          <Spinner size={40} />
          <PaperTitle>Validating account</PaperTitle>
        </ReadyView>
      )}
      {verified && (
        <ReadyView>
          <PaperIconButton animated icon="check-decagram" />
          <PaperTitle>You are ready to go!</PaperTitle>
        </ReadyView>
      )}
      <PaperButton onPress={() => navigation.navigate('Login')}>
        Go to Login
      </PaperButton>
    </Container>
  )
}

export default ValidateEmail
