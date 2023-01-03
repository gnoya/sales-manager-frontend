import { ErrorMessage, Field, Form, Formik } from 'formik'
import Input from '../../components/input/input.component'
import { useLoading } from '../../hooks/use-loading/use-loading.hook'
import AddLayout from '../../layouts/add/add.layout'
import styles from './sales-add.page.module.css'
import InvalidInputMessage from '../../components/invalid-input-message/invalid-input-message.component'
import Button from '../../components/button/button.component'
import InputContainer from '../../components/input-container/input-container.component'
import Title from '../../components/title/title.component'
import { useNavigate } from 'react-router'
import { useErrorHandler } from '../../hooks/use-error-handler/use-error-handler.hook'

import { createSale } from '../../services/sale.service'
import { Sale, saleFormValidation } from '../../models/sale.model'

export default function SalesAddPage() {
  const { isLoading, startLoading, stopLoading } = useLoading()
  const navigate = useNavigate()
  const handleError = useErrorHandler()

  const initialValues: Omit<Sale, 'id'> = {
    productId: '',
    userId: '',
    quantity: 0,
    deliveryDate: new Date().toISOString(),
  }

  async function submit(values: typeof initialValues) {
    startLoading()

    try {
      await createSale(
        values.productId,
        values.userId,
        values.quantity,
        values.deliveryDate
      )
      navigate(-1)
    } catch (err) {
      handleError(err)
    }

    stopLoading()
  }

  return (
    <AddLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={saleFormValidation}
        onSubmit={submit}
      >
        <Form className={styles.form}>
          <Title>Add a new sale</Title>
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
    </AddLayout>
  )
}
