import { Product } from '../../models/product.model'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import toast from 'react-hot-toast'
import { useModal } from '../../hooks/use-modal/use-modal.hook'
import { deleteProduct } from '../../services/product.service'
import { useErrorHandler } from '../../hooks/use-error-handler/use-error-handler.hook'
import styles from './product-item.component.module.css'

interface ProductItemProps {
  product: Product
  onClick?: () => void
  onDelete: () => void
}

export default function ProductItem({
  product,
  onClick,
  onDelete,
}: ProductItemProps) {
  const modal = useModal()
  const handleError = useErrorHandler()

  async function deleteItem(e: any) {
    e.stopPropagation() // to stop the onClick of the div parent

    const confirmation = await modal.fire({
      title: 'Deleting product',
      text: 'Do you want to remove this product?',
      confirmButtonText: 'Delete',
    })

    if (confirmation.isConfirmed) {
      try {
        await deleteProduct(product.id)
        toast.success('Product deleted succesfully')
        onDelete()
      } catch (err) {
        handleError(err)
      }
    }
  }

  return (
    <div className={styles.container} onClick={onClick}>
      <p className={styles.firstColumn}>{product.name || '-'}</p>
      <p className={styles.secondColumn}>{product.quantity}</p>
      <FontAwesomeIcon
        onClick={deleteItem}
        icon={faTrashCan}
        className={styles.deleteIcon}
      />
    </div>
  )
}
