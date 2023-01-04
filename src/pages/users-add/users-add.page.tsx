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
import BoxContainer from '../../components/box-container/box-container.component'

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
        <BoxContainer className={styles.boxContainer}>
          <Form className={styles.form}>
            <Title>Add a new user</Title>
            <div className={styles.body}>
              <InputContainer>
                <Field
                  as={Input}
                  type="text"
                  name="fullName"
                  enterKeyHint="next"
                  disabled={isLoading}
                  label="Name"
                />
                <ErrorMessage name="fullName" component={InvalidInputMessage} />
              </InputContainer>
              <InputContainer>
                <Field
                  as={Input}
                  type="text"
                  name="identification"
                  enterKeyHint="next"
                  disabled={isLoading}
                  label="Identification"
                />
                <ErrorMessage
                  name="identification"
                  component={InvalidInputMessage}
                />
              </InputContainer>
              <InputContainer>
                <Field
                  as={Input}
                  type="text"
                  name="phone"
                  enterKeyHint="next"
                  disabled={isLoading}
                  label="Phone"
                />
                <ErrorMessage name="phone" component={InvalidInputMessage} />
              </InputContainer>
              <InputContainer>
                <Field
                  as={Input}
                  type="text"
                  name="address"
                  enterKeyHint="next"
                  disabled={isLoading}
                  label="Address"
                />
                <ErrorMessage name="address" component={InvalidInputMessage} />
              </InputContainer>
              <Button
                type="submit"
                variant="secondary"
                className={styles.submitButton}
                disabled={isLoading}
              >
                Create
              </Button>
            </div>
          </Form>
        </BoxContainer>
      </Formik>
    </BackButtonLayout>
  )
}
