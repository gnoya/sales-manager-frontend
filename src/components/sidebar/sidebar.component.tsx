import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCartShopping,
  faUser,
  faCubesStacked,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'

import styles from './sidebar.component.module.css'
import Button from '../button/button.component'
import { useLogout } from '../../hooks/use-logout/use-logout.hook'

export default function Sidebar() {
  const logout = useLogout()

  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faCartShopping} className={styles.logo} />
      <div className={styles.buttonsContainer}>
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
      <Button variant="transparent" className={styles.button} onClick={logout}>
        <FontAwesomeIcon icon={faRightFromBracket} className={styles.icon} />
        <p className={styles.buttonText}>Logout</p>
      </Button>
    </div>
  )
}
