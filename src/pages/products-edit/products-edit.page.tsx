import { ErrorMessage, Field, Form, Formik } from 'formik'
import Input from '../../components/input/input.component'
import { useLoading } from '../../hooks/use-loading/use-loading.hook'
import AddLayout from '../../layouts/add/add.layout'
import { useCallback, useEffect, useState } from 'react'

import styles from './products-edit.page.module.css'
import InvalidInputMessage from '../../components/invalid-input-message/invalid-input-message.component'
import Button from '../../components/button/button.component'
import InputContainer from '../../components/input-container/input-container.component'
import Title from '../../components/title/title.component'
import { useNavigate, useParams } from 'react-router'
import { useErrorHandler } from '../../hooks/use-error-handler/use-error-handler.hook'

import { getProduct, updateProduct } from '../../services/product.service'
import { Product, productFormValidation } from '../../models/product.model'

export default function ProductsEditPage() {
  const { isLoading, startLoading, stopLoading } = useLoading()
  const navigate = useNavigate()
  const handleError = useErrorHandler()
  const { id } = useParams()
  const [product, setProduct] = useState<Product>()

  const initialValues: Omit<Product, 'id'> = {
    name: product?.name || '',
    quantity: product?.quantity || 0,
  }

  async function submit(values: typeof initialValues) {
    if (!product) return

    startLoading()

    try {
      await updateProduct(product.id, values.name, values.quantity)
      navigate(-1)
    } catch (err) {
      handleError(err)
    }

    stopLoading()
  }

  const fetchSale = useCallback(async () => {
    startLoading()

    try {
      const currentProduct = await getProduct(id || '')
      setProduct(currentProduct)
    } catch (err) {
      handleError(err)
    }

    stopLoading()
  }, [id, setProduct, handleError, startLoading, stopLoading])

  useEffect(() => {
    fetchSale()
  }, [fetchSale])

  return (
    <AddLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={productFormValidation}
        enableReinitialize
        onSubmit={submit}
      >
        <Form className={styles.form}>
          <Title>Edit a product</Title>
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
              Update
            </Button>
          </div>
        </Form>
      </Formik>
    </AddLayout>
  )
}
