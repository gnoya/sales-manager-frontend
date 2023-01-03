import { ErrorMessage, Field, Form, Formik } from 'formik'
import Input from '../../components/input/input.component'
import { useLoading } from '../../hooks/use-loading/use-loading.hook'
import BackButtonLayout from '../../layouts/back-button/back-button.layout'
import styles from './sales-add.page.module.css'
import InvalidInputMessage from '../../components/invalid-input-message/invalid-input-message.component'
import Button from '../../components/button/button.component'
import InputContainer from '../../components/input-container/input-container.component'
import Title from '../../components/title/title.component'
import { useNavigate } from 'react-router'
import { useErrorHandler } from '../../hooks/use-error-handler/use-error-handler.hook'
import { createSale } from '../../services/sale.service'
import { Sale, saleFormValidation } from '../../models/sale.model'
import ProductSearch from '../../components/product-search/product-search.component'
import { Product } from '../../models/product.model'
import { useState } from 'react'
import UserSearch from '../../components/user-search/user-search.component'
import { User } from '../../models/user.model'

export default function SalesAddPage() {
  const { isLoading, startLoading, stopLoading } = useLoading()
  const [showProductPicker, setShowProductPicker] = useState<boolean>(false)
  const [showUserPicker, setShowUserPicker] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<Product>()
  const [selectedUser, setSelectedUser] = useState<User>()

  const navigate = useNavigate()
  const handleError = useErrorHandler()

  const initialValues: Omit<Sale, 'id' | 'productId' | 'userId'> = {
    quantity: 1,
    deliveryDate: new Date().toLocaleString(),
  }

  function areUserAndProductPicked() {
    return selectedProduct !== undefined && selectedUser !== undefined
  }

  async function submit(values: typeof initialValues) {
    if (!areUserAndProductPicked()) return
    startLoading()

    try {
      await createSale(
        selectedProduct?.id || '',
        selectedUser?.id || '',
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
    <BackButtonLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={saleFormValidation}
        onSubmit={submit}
      >
        <Form className={styles.form}>
          <Title>Add a new sale</Title>
          <div className={styles.body}>
            <div className={styles.pickRow}>
              <span>{selectedProduct?.name || 'Select the product:'}</span>
              <Button variant="main" onClick={() => setShowProductPicker(true)}>
                Select product
              </Button>
            </div>
            <div className={styles.pickRow}>
              <span>{selectedUser?.fullName || 'Select the user:'}</span>
              <Button variant="main" onClick={() => setShowUserPicker(true)}>
                Select user
              </Button>
            </div>
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
            <InputContainer label="Delivery date">
              <Field
                as={Input}
                type="text"
                name="deliveryDate"
                placeholder={'Delivery date'}
                enterKeyHint="next"
                disabled={isLoading}
              />
              <ErrorMessage
                name="deliveryDate"
                component={InvalidInputMessage}
              />
            </InputContainer>
            <Button
              type="submit"
              variant="main"
              className={styles.submitButton}
              disabled={isLoading || !areUserAndProductPicked()}
            >
              Create
            </Button>
          </div>
        </Form>
      </Formik>
      {showProductPicker && (
        <ProductSearch
          onSelect={(product: Product) => {
            setSelectedProduct(product)
            setShowProductPicker(false)
          }}
        />
      )}
      {showUserPicker && (
        <UserSearch
          onSelect={(user: User) => {
            setSelectedUser(user)
            setShowUserPicker(false)
          }}
        />
      )}
    </BackButtonLayout>
  )
}
