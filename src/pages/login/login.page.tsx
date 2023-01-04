import Title from '../../components/title/title.component'
import { usePageTitle } from '../../hooks/use-page-title/use-page-title.hook'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import InputContainer from '../../components/input-container/input-container.component'
import Input from '../../components/input/input.component'
import InvalidInputMessage from '../../components/invalid-input-message/invalid-input-message.component'
import Button from '../../components/button/button.component'
import { useAuthForm } from '../../hooks/use-auth-form/use-auth-form.hook'
import BoxContainer from '../../components/box-container/box-container.component'

import styles from './login.page.module.css'

export default function LoginPage() {
  const { initialValues, submit, validation, isLoading } = useAuthForm()
  usePageTitle('Login')

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={submit}
      >
        <BoxContainer className={styles.boxContainer}>
          <Form className={styles.form}>
            <Title>Login</Title>
            <div className={styles.body}>
              <InputContainer>
                <Field
                  as={Input}
                  type="email"
                  name="email"
                  enterKeyHint="next"
                  disabled={isLoading}
                  label={'Email'}
                />
                <ErrorMessage name="email" component={InvalidInputMessage} />
              </InputContainer>
              <InputContainer>
                <Field
                  as={Input}
                  type="password"
                  name="password"
                  enterKeyHint="next"
                  disabled={isLoading}
                  label="Password"
                />
                <ErrorMessage name="password" component={InvalidInputMessage} />
              </InputContainer>
              <Button
                type="submit"
                variant="main"
                className={styles.submitButton}
                disabled={isLoading}
              >
                Login
              </Button>
            </div>
          </Form>
        </BoxContainer>
      </Formik>
    </div>
  )
}
