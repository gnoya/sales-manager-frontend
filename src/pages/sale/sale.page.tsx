import { useParams } from 'react-router'
import styles from './sale.page.module.css'

export default function SalePage() {
  const { id } = useParams()

  return <div className={styles.container}>{`Sale ${id}`}</div>
}
