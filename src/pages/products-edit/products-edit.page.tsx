import { ErrorMessage, Field, Form, Formik } from 'formik'
import Input from '../../components/input/input.component'
import { useLoading } from '../../hooks/use-loading/use-loading.hook'
import BackButtonLayout from '../../layouts/back-button/back-button.layout'
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
import BoxContainer from '../../components/box-container/box-container.component'

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

  const fetchProduct = useCallback(async () => {
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
    fetchProduct()
  }, [fetchProduct])

  return (
    <BackButtonLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={productFormValidation}
        enableReinitialize
        onSubmit={submit}
      >
        <BoxContainer className={styles.boxContainer}>
          <Form className={styles.form}>
            <Title>Edit a product</Title>
            <div className={styles.body}>
              <InputContainer>
                <Field
                  as={Input}
                  type="text"
                  name="name"
                  enterKeyHint="next"
                  disabled={isLoading}
                  label="Name"
                />
                <ErrorMessage name="name" component={InvalidInputMessage} />
              </InputContainer>
              <InputContainer>
                <Field
                  as={Input}
                  type="number"
                  name="quantity"
                  enterKeyHint="next"
                  disabled={isLoading}
                  label="Quantity"
                />
                <ErrorMessage name="quantity" component={InvalidInputMessage} />
              </InputContainer>
              <Button
                type="submit"
                variant="secondary"
                className={styles.submitButton}
                disabled={isLoading}
              >
                Update
              </Button>
            </div>
          </Form>
        </BoxContainer>
      </Formik>
    </BackButtonLayout>
  )
}
