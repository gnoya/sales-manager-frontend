import Title from '../../components/title/title.component'
import { usePageTitle } from '../../hooks/use-page-title/use-page-title'
import styles from './login.page.module.css'

export default function LoginPage() {
  usePageTitle('Login')

  return (
    <div className={styles.container}>
      <Title>Login page!</Title>
    </div>
  )
}
