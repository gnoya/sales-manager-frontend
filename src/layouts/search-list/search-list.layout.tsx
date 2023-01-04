import { ReactNode } from 'react'
import Title from '../../components/title/title.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import styles from './search-list.layout.module.css'
import BoxContainer from '../../components/box-container/box-container.component'

interface SearchListLayoutProps {
  title: string
  searchBar: ReactNode
  children?: ReactNode
}

export default function SearchListLayout({
  title,
  searchBar,
  children,
}: SearchListLayoutProps) {
  return (
    <BoxContainer>
      <div className={styles.container}>
        <Title>{title}</Title>
        <div className={styles.rowContainer}>
          {searchBar}
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <div className={styles.listContainer}>{children}</div>
      </div>
    </BoxContainer>
  )
}
