import { ReactNode } from 'react'
import Sidebar from '../../components/sidebar/sidebar.component'
import { usePageTitle } from '../../hooks/use-page-title/use-page-title'
import styles from './dashboard.layout.module.css'

interface DashboardLayoutProps {
  pageTitle: string
  children: ReactNode
}

export default function DashboardLayout({
  pageTitle,
  children,
}: DashboardLayoutProps) {
  usePageTitle(pageTitle)

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.childrenContainer}></div>
      {children}
    </div>
  )
}
