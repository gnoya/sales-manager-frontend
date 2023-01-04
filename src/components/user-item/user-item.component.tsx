import { User } from '../../models/user.model'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import toast from 'react-hot-toast'
import { useModal } from '../../hooks/use-modal/use-modal.hook'
import { deleteUser } from '../../services/user.service'
import { useErrorHandler } from '../../hooks/use-error-handler/use-error-handler.hook'
import styles from './user-item.component.module.css'
import clsx from 'clsx'

interface UserItemProps {
  user: User
  grayBackground: boolean
  hideActionButtons?: boolean
  onClick?: () => void
  onDelete?: () => void
}

export default function UserItem({
  user,
  grayBackground,
  hideActionButtons = false,
  onClick,
  onDelete,
}: UserItemProps) {
  const modal = useModal({})
  const handleError = useErrorHandler()

  async function deleteItem(e: any) {
    e.stopPropagation() // to stop the onClick of the div parent

    const confirmation = await modal.fire({
      title: 'Deleting user',
      text: 'Do you want to remove this user?',
      confirmButtonText: 'Delete',
      showCancelButton: false,
    })

    if (confirmation.isConfirmed) {
      try {
        await deleteUser(user.id)
        toast.success('User deleted succesfully')
        onDelete && onDelete()
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
      <p className={styles.firstColumn}>{user.fullName}</p>
      <p className={styles.secondColumn}>{user.phone}</p>
      {!hideActionButtons && (
        <div className={styles.forthColumn}>
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
