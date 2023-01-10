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
import BoxContainer from '../../components/box-container/box-container.component'
import CustomDatePicker from '../../components/date-picker/date-picker.component'

export default function SalesAddPage() {
  const { isLoading, startLoading, stopLoading } = useLoading()
  const [showProductPicker, setShowProductPicker] = useState<boolean>(false)
  const [showUserPicker, setShowUserPicker] = useState<boolean>(false)

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null)

  const navigate = useNavigate()
  const handleError = useErrorHandler()

  const initialValues: Omit<
    Sale,
    'id' | 'productId' | 'userId' | 'deliveryDate'
  > = {
    quantity: 1,
  }

  function isProductPicked(product: unknown): product is Product {
    return product !== null
  }

  function isUserPicked(user: unknown): user is User {
    return user !== null
  }

  function isDatePicked(date: unknown): date is Date {
    return date !== null
  }

  async function submit(values: typeof initialValues) {
    console.log('submit')
    if (
      !isProductPicked(selectedProduct) ||
      !isUserPicked(selectedUser) ||
      !isDatePicked(deliveryDate)
    )
      return

    startLoading()

    try {
      await createSale(
        selectedProduct.id,
        selectedUser.id,
        values.quantity,
        deliveryDate.toISOString()
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
        <BoxContainer className={styles.boxContainer}>
          <Form className={styles.form}>
            <Title>Add a new sale</Title>
            <div className={styles.body}>
              <div className={styles.pickRow}>
                <span>{selectedProduct?.name || 'Select the product:'}</span>
                <Button
                  type="button"
                  variant={`${selectedProduct ? 'main' : 'secondary'}`}
                  onClick={() => {
                    setShowProductPicker(true)
                    setSelectedProduct(null)
                  }}
                >
                  Select product
                </Button>
              </div>
              <div className={styles.pickRow}>
                <span>{selectedUser?.fullName || 'Select the user:'}</span>
                <Button
                  type="button"
                  variant={`${selectedUser ? 'main' : 'secondary'}`}
                  onClick={() => {
                    setShowUserPicker(true)
                    setSelectedUser(null)
                  }}
                >
                  Select user
                </Button>
              </div>
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
              <CustomDatePicker
                onDateChange={(date: Date) => setDeliveryDate(date)}
              />
              <Button
                type="submit"
                variant="secondary"
                className={styles.submitButton}
                disabled={
                  isLoading ||
                  !isProductPicked(selectedProduct) ||
                  !isUserPicked(selectedUser) ||
                  !isDatePicked(deliveryDate)
                }
              >
                Create
              </Button>
            </div>
          </Form>
        </BoxContainer>
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
