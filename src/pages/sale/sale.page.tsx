import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useErrorHandler } from '../../hooks/use-error-handler/use-error-handler.hook'
import { useLoading } from '../../hooks/use-loading/use-loading.hook'
import BackButtonLayout from '../../layouts/back-button/back-button.layout'
import { Sale } from '../../models/sale.model'
import { getSale } from '../../services/sale.service'
import styles from './sale.page.module.css'

export default function SalePage() {
  const { id } = useParams()
  const { startLoading, stopLoading } = useLoading()
  const handleError = useErrorHandler()
  const [sale, setSale] = useState<Sale>()

  const fetchSale = useCallback(async () => {
    if (!id) return

    startLoading()

    try {
      const sale = await getSale(id)
      setSale(sale)
    } catch (err) {
      handleError(err)
    }

    stopLoading()
  }, [id, setSale, handleError, startLoading, stopLoading])

  useEffect(() => {
    fetchSale()
  }, [fetchSale])

  return (
    <BackButtonLayout>
      <div className={styles.container}>
        <h3>Sale:</h3>
        <p>
          <span>Product:</span> {sale?.product?.name}
        </p>
        <p>
          <span>Quantity:</span> {sale?.quantity}
        </p>

        <p>
          <span>Delivery date: </span>
          {sale?.deliveryDate}
        </p>
        <h3>Client:</h3>
        <p>
          <span>Name: </span>
          {sale?.user?.fullName}
        </p>
        <p>
          <span>Email: </span>
          {sale?.user?.identification}
        </p>
        <p>
          <span>Phone: </span>
          {sale?.user?.phone}
        </p>
        <p>
          <span>Address: </span>
          {sale?.user?.address}
        </p>
        <p>
          <span>Email: </span>
          {sale?.user?.email}
        </p>
      </div>
    </BackButtonLayout>
  )
}
