import React, { useState } from 'react'
import { Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import { Formik, FormikHelpers } from 'formik'

import { NavPropsContactUs } from '../../routes/types'
import Input from '../components/input'
import * as API from '../../API/mail'
import ConfigRTK from '../../store/config'
import { FormValidation, FormData } from './types'
import { FormView, SendButton, ScrollView, PaperKeyboardAvoidingView, PaperText } from './styles'

const ContactUs: React.FC<NavPropsContactUs> = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const Send = async (values: FormData, actions: FormikHelpers<FormData>) => {
    setLoading(true)
    const response = await API.send(values)
    if (typeof response === 'boolean' && response) {
      actions.resetForm({
        values: { subject: '', text: '' },
      })
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Great!',
          alertMessage:
            'Thank you for contacting us. We will reach out to you as fast as the speed of light (299.792,458 km/sec)',
          okText: 'Ok',
        })
      )
    } else {
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage:
            response && 'statusCode' in response
              ? response.message
              : 'Something went wrong, review your message and try again',
          okText: 'Ok',
        })
      )
    }
    setLoading(false)
  }

  return (
    <PaperKeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 92 : 0}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <FormView>
          <PaperText>
            We are look forward to hearing from you. Please fill out the form below with any
            suggestion, question, or concern.
          </PaperText>
          <Formik
            initialValues={{
              subject: '',
              text: '',
            }}
            onSubmit={(values, actions) => Send(values, actions)}
            validationSchema={FormValidation}
          >
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <>
                <Input
                  label="Subject"
                  onChangeText={handleChange('subject')}
                  onBlur={() => setFieldTouched('subject')}
                  value={values.subject}
                  error={touched.subject && errors.subject ? errors.subject : undefined}
                />
                <Input
                  label="Message"
                  multiline
                  onChangeText={handleChange('text')}
                  onBlur={() => setFieldTouched('text')}
                  value={values.text}
                  error={touched.text && errors.text ? errors.text : undefined}
                />
                <SendButton
                  mode="contained"
                  icon="email-send-outline"
                  onPress={handleSubmit}
                  disabled={!isValid || loading}
                  loading={loading}
                >
                  Send
                </SendButton>
              </>
            )}
          </Formik>
        </FormView>
      </ScrollView>
    </PaperKeyboardAvoidingView>
  )
}

export default ContactUs
