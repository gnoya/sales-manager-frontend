import Title from '../../components/title/title.component'
import { usePageTitle } from '../../hooks/use-page-title/use-page-title.hook'
import styles from './login.page.module.css'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import InputContainer from '../../components/input-container/input-container.component'
import Input from '../../components/input/input.component'
import InvalidInputMessage from '../../components/invalid-input-message/invalid-input-message.component'
import Button from '../../components/button/button.component'
import { useAuthForm } from '../../hooks/use-auth-form/use-auth-form.hook'

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
        <Form className={styles.form}>
          <Title>Login</Title>
          <div className={styles.body}>
            <InputContainer>
              <Field
                as={Input}
                type="email"
                name="email"
                placeholder={'Email'}
                enterKeyHint="next"
                disabled={isLoading}
              />
              <ErrorMessage name="email" component={InvalidInputMessage} />
            </InputContainer>
            <InputContainer>
              <Field
                as={Input}
                type="password"
                name="password"
                placeholder={'Password'}
                enterKeyHint="next"
                disabled={isLoading}
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
      </Formik>
    </div>
  )
}
