import React from 'react'
import { Paragraph } from 'react-native-paper'

import { formValidation } from './types'
import Input from '../../../components/input'
import theme from '../../../../theme'
import { NavPropsFertilizerList } from '../../../../routes/types'
import { SelectDoseProps, FormData } from './types'
import { Button, ViewRow } from './styles'
import { Formik } from 'formik'

const SelectDose: React.FC<NavPropsFertilizerList & SelectDoseProps> = ({
  navigation,
  visible,
  fertilizerId,
  fertilizerName,
  onDismiss,
}) => {
  const save = async ({ dose }: FormData) => {
    onDismiss(false)
    const fertilizerDoseData = {
      id: fertilizerId,
      name: fertilizerName,
      dose,
    }
    navigation.navigate('AddEditTank', {
      fertilizers: {
        ...fertilizerDoseData,
      },
    })
  }

  if (!visible) {
    return null
  }

  return (
    <Formik
      initialValues={{
        dose: '',
      }}
      onSubmit={values => save(values)}
      validationSchema={formValidation}
    >
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <>
          <Paragraph>How many milliliters do you dose per day?</Paragraph>
          <Input
            label="Dose"
            onChangeText={handleChange('dose')}
            onBlur={() => setFieldTouched('dose')}
            keyboardType="numeric"
            value={values.dose}
            error={errors.dose ? errors.dose : undefined}
          />
          <ViewRow>
            <Button color={theme.colors.error} onPress={() => onDismiss(false)}>
              Cancel
            </Button>
            <Button onPress={handleSubmit} disabled={!isValid}>
              Add to tank
            </Button>
          </ViewRow>
        </>
      )}
    </Formik>
  )
}

export default SelectDose
