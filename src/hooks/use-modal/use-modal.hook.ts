import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import styles from './use-modal.hook.module.css'

interface UseModalParams {
  danger?: boolean
  showCancelButton?: boolean
}

/*
  This hook is used to pop modals in any page

  Params:
  danger: used to display a warning icon in the modal
  showCancelButton: used to display a cancel button in the modal
*/
export function useModal({
  danger = false,
  showCancelButton = false,
}: UseModalParams) {
  const modal = withReactContent(
    Swal.mixin({
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        container: styles.container,
        title: styles.title,
        popup: styles.modal,
        htmlContainer: styles.content,
        validationMessage: styles.validationMessage,
        footer: styles.footer,
        confirmButton: `${styles.modalButton} ${
          danger ? styles.modalConfirmButtonDanger : styles.modalConfirmButton
        }`,
        cancelButton: `${styles.modalButton} ${styles.modalCancelButton}`,
      },
      showCancelButton: showCancelButton,
      confirmButtonText: 'Ok',
    })
  )

  return modal
}
