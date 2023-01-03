import { ErrorMessage, Field, Form, Formik } from 'formik'
import Input from '../../components/input/input.component'
import { useLoading } from '../../hooks/use-loading/use-loading.hook'
import BackButtonLayout from '../../layouts/back-button/back-button.layout'

import styles from './users-add.page.module.css'
import InvalidInputMessage from '../../components/invalid-input-message/invalid-input-message.component'
import Button from '../../components/button/button.component'
import InputContainer from '../../components/input-container/input-container.component'
import Title from '../../components/title/title.component'
import { useNavigate } from 'react-router'
import { useErrorHandler } from '../../hooks/use-error-handler/use-error-handler.hook'

import { createUser } from '../../services/user.service'
import { User, userFormValidation } from '../../models/user.model'

export default function UsersAddPage() {
  const { isLoading, startLoading, stopLoading } = useLoading()
  const navigate = useNavigate()
  const handleError = useErrorHandler()

  const initialValues: Omit<User, 'id' | 'email' | 'token'> = {
    fullName: '',
    identification: '',
    phone: '',
    address: '',
  }

  async function submit(values: typeof initialValues) {
    startLoading()

    try {
      await createUser(
        values.fullName,
        values.identification,
        values.phone,
        values.address
      )
      navigate(-1)
    } catch (err) {
      handleError(err)
    }

    stopLoading()
  }

  return (
    <BackButtonLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={userFormValidation}
        onSubmit={submit}
      >
        <Form className={styles.form}>
          <Title>Add a new user</Title>
          <div className={styles.body}>
            <InputContainer label="Name">
              <Field
                as={Input}
                type="text"
                name="fullName"
                placeholder={'Name'}
                enterKeyHint="next"
                disabled={isLoading}
              />
              <ErrorMessage name="fullName" component={InvalidInputMessage} />
            </InputContainer>
            <InputContainer label="Identification">
              <Field
                as={Input}
                type="text"
                name="identification"
                placeholder={'Identification'}
                enterKeyHint="next"
                disabled={isLoading}
              />
              <ErrorMessage
                name="identification"
                component={InvalidInputMessage}
              />
            </InputContainer>
            <InputContainer label="Phone">
              <Field
                as={Input}
                type="text"
                name="phone"
                placeholder={'Phone'}
                enterKeyHint="next"
                disabled={isLoading}
              />
              <ErrorMessage name="phone" component={InvalidInputMessage} />
            </InputContainer>
            <InputContainer label="Address">
              <Field
                as={Input}
                type="text"
                name="address"
                placeholder={'Address'}
                enterKeyHint="next"
                disabled={isLoading}
              />
              <ErrorMessage name="address" component={InvalidInputMessage} />
            </InputContainer>
            <Button
              type="submit"
              variant="main"
              className={styles.submitButton}
              disabled={isLoading}
            >
              Create
            </Button>
          </div>
        </Form>
      </Formik>
    </BackButtonLayout>
  )
}
