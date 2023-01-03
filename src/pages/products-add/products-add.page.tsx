import { ErrorMessage, Field, Form, Formik } from 'formik'
import Input from '../../components/input/input.component'
import { useLoading } from '../../hooks/use-loading/use-loading.hook'
import BackButtonLayout from '../../layouts/back-button/back-button.layout'

import styles from './products-add.page.module.css'
import InvalidInputMessage from '../../components/invalid-input-message/invalid-input-message.component'
import Button from '../../components/button/button.component'
import InputContainer from '../../components/input-container/input-container.component'
import Title from '../../components/title/title.component'
import { useNavigate } from 'react-router'
import { useErrorHandler } from '../../hooks/use-error-handler/use-error-handler.hook'

import { createProduct } from '../../services/product.service'
import { Product, productFormValidation } from '../../models/product.model'

export default function ProductsAddPage() {
  const { isLoading, startLoading, stopLoading } = useLoading()
  const navigate = useNavigate()
  const handleError = useErrorHandler()

  const initialValues: Omit<Product, 'id'> = {
    name: '',
    quantity: 0,
  }

  async function submit(values: typeof initialValues) {
    startLoading()

    try {
      await createProduct(values.name, values.quantity)
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
        validationSchema={productFormValidation}
        onSubmit={submit}
      >
        <Form className={styles.form}>
          <Title>Add a new product</Title>
          <div className={styles.body}>
            <InputContainer label="Name">
              <Field
                as={Input}
                type="text"
                name="name"
                placeholder={'Name'}
                enterKeyHint="next"
                disabled={isLoading}
              />
              <ErrorMessage name="name" component={InvalidInputMessage} />
            </InputContainer>
            <InputContainer label="Quantity">
              <Field
                as={Input}
                type="number"
                name="quantity"
                placeholder={'Quantity'}
                enterKeyHint="next"
                disabled={isLoading}
              />
              <ErrorMessage name="quantity" component={InvalidInputMessage} />
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
