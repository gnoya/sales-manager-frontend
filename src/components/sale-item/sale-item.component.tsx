import { Sale } from '../../models/sale.model'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import toast from 'react-hot-toast'
import { useModal } from '../../hooks/use-modal/use-modal.hook'
import { deleteSale } from '../../services/sale.service'
import { useErrorHandler } from '../../hooks/use-error-handler/use-error-handler.hook'
import { clsx } from 'clsx'
import styles from './sale-item.component.module.css'

interface SaleItemProps {
  sale: Sale
  grayBackground: boolean
  onClick?: () => void
  onDelete: () => void
}

export default function SaleItem({
  grayBackground,
  sale,
  onClick,
  onDelete,
}: SaleItemProps) {
  const modal = useModal()
  const handleError = useErrorHandler()

  async function deleteItem(e: any) {
    e.stopPropagation() // to stop the onClick of the div parent

    const confirmation = await modal.fire({
      title: 'Deleting sale',
      text: 'Do you want to remove this sale?',
      confirmButtonText: 'Delete',
    })

    if (confirmation.isConfirmed) {
      try {
        await deleteSale(sale.id)
        toast.success('Sale deleted succesfully')
        onDelete()
      } catch (err) {
        handleError(err)
      }
    }
  }

  return (
    <div
      className={clsx(
        styles.container,
        grayBackground && styles.grayBackground
      )}
      onClick={onClick}
    >
      <p className={styles.firstColumn}>{sale.product?.name || '-'}</p>
      <p className={styles.secondColumn}>{sale.quantity}</p>
      <p className={styles.thirdColumn}>{sale.deliveryDate}</p>
      <div className={styles.forthColumn}>
        <FontAwesomeIcon
          onClick={deleteItem}
          icon={faTrashCan}
          className={styles.deleteIcon}
        />
      </div>
    </div>
  )
}
