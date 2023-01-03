import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCartShopping,
  faUser,
  faCubesStacked,
  faRightFromBracket,
  faQuestion,
  faGear,
} from '@fortawesome/free-solid-svg-icons'

import styles from './sidebar.component.module.css'
import Button from '../button/button.component'
import { useLogout } from '../../hooks/use-logout/use-logout.hook'
import { useModal } from '../../hooks/use-modal/use-modal.hook'
import { useAuth } from '../../hooks/use-auth/use-auth.hook'

export default function Sidebar() {
  const logout = useLogout()
  const modal = useModal()
  const { user } = useAuth()

  function pageNotAvailable() {
    modal.fire({
      title: 'Page not available',
      text: 'This page is not available yet, please come back later!',
      confirmButtonText: 'Sure!',
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.logoContainer}>
          <FontAwesomeIcon icon={faCartShopping} className={styles.logo} />
        </div>
        <p>{user?.fullName}</p>
      </div>

      <div className={styles.middleSection}>
        <NavLink
          to="/dashboard/sales/"
          className={({ isActive }) =>
            isActive ? styles.buttonActive : styles.button
          }
        >
          <FontAwesomeIcon icon={faCartShopping} className={styles.icon} />
          <p className={styles.buttonText}>Sales</p>
        </NavLink>
        <NavLink
          to="/dashboard/products/"
          className={({ isActive }) =>
            isActive ? styles.buttonActive : styles.button
          }
        >
          <FontAwesomeIcon icon={faCubesStacked} className={styles.icon} />
          <p className={styles.buttonText}>Products</p>
        </NavLink>
        <NavLink
          to="/dashboard/users/"
          className={({ isActive }) =>
            isActive ? styles.buttonActive : styles.button
          }
        >
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
          <p className={styles.buttonText}>Users</p>
        </NavLink>
      </div>
      <div className={styles.bottomSection}>
        <Button
          variant="transparent"
          className={styles.button}
          onClick={pageNotAvailable}
        >
          <FontAwesomeIcon icon={faGear} className={styles.icon} />
          <p className={styles.buttonText}>Settings</p>
        </Button>
        <Button
          variant="transparent"
          className={styles.button}
          onClick={pageNotAvailable}
        >
          <FontAwesomeIcon icon={faQuestion} className={styles.icon} />
          <p className={styles.buttonText}>Help</p>
        </Button>
        <Button
          variant="transparent"
          className={styles.button}
          onClick={logout}
        >
          <FontAwesomeIcon icon={faRightFromBracket} className={styles.icon} />
          <p className={styles.buttonText}>Logout</p>
        </Button>
      </div>
    </div>
  )
}
