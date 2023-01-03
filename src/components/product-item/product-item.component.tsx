import { Product } from '../../models/product.model'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast'
import { useModal } from '../../hooks/use-modal/use-modal.hook'
import { deleteProduct } from '../../services/product.service'
import { useErrorHandler } from '../../hooks/use-error-handler/use-error-handler.hook'
import styles from './product-item.component.module.css'
import { useLocation, useNavigate } from 'react-router'

interface ProductItemProps {
  product: Product
  hideActionButtons?: boolean
  onClick?: () => void
  onDelete?: () => void
}

export default function ProductItem({
  product,
  hideActionButtons = false,
  onClick,
  onDelete,
}: ProductItemProps) {
  const modal = useModal()
  const handleError = useErrorHandler()
  const navigate = useNavigate()
  const { pathname } = useLocation()

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
        onDelete && onDelete()
      } catch (err) {
        handleError(err)
      }
    }
  }

  function editItem() {
    navigate(`${pathname}../products-edit`)
  }

  return (
    <div className={styles.container} onClick={onClick}>
      <p className={styles.firstColumn}>{product.name}</p>
      <p className={styles.secondColumn}>{product.quantity}</p>

      {!hideActionButtons && (
        <div className={styles.thirdColumn}>
          <FontAwesomeIcon
            onClick={editItem}
            icon={faPen}
            className={styles.deleteIcon}
          />
          <FontAwesomeIcon
            onClick={deleteItem}
            icon={faTrashCan}
            className={styles.deleteIcon}
          />
        </div>
      )}
    </div>
  )
}
