import { NavLink } from 'react-router-dom'
import styles from './sidebar.component.module.css'

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <NavLink
        to="/sales"
        className={({ isActive }) =>
          isActive ? styles.buttonActive : styles.button
        }
      >
        <p className={styles.buttonText}>Sales</p>
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive ? styles.buttonActive : styles.button
        }
      >
        <p className={styles.buttonText}>Products</p>
      </NavLink>
      <NavLink
        to="/users"
        className={({ isActive }) =>
          isActive ? styles.buttonActive : styles.button
        }
      >
        <p className={styles.buttonText}>Users</p>
      </NavLink>
      <NavLink
        to="/logout"
        className={({ isActive }) =>
          isActive ? styles.buttonActive : styles.button
        }
      >
        <p className={styles.buttonText}>Logout</p>
      </NavLink>
    </div>
  )
}
