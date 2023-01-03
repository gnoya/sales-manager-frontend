import { User } from '../../models/user.model'
import { useErrorHandler } from '../../hooks/use-error-handler/use-error-handler.hook'
import styles from './user-search.component.module.css'
import SearchListLayout from '../../layouts/search-list/search-list.layout'
import InputContainer from '../input-container/input-container.component'
import Input from '../input/input.component'
import { useCallback, useEffect, useState } from 'react'
import { useLoading } from '../../hooks/use-loading/use-loading.hook'
import { getUsersByName } from '../../services/user.service'
import UserItem from '../user-item/user-item.component'

interface UserSearchProps {
  onSelect: (user: User) => void
}

export default function UserSearch({ onSelect }: UserSearchProps) {
  const handleError = useErrorHandler()
  const { startLoading, stopLoading } = useLoading()
  const [users, setUsers] = useState<User[]>([])
  const [input, setInput] = useState<string>('')

  const fetchUsers = useCallback(async () => {
    startLoading()

    try {
      const users = await getUsersByName(input)
      setUsers(users)
    } catch (err) {
      handleError(err)
    }

    stopLoading()
  }, [input, handleError, startLoading, stopLoading])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <SearchListLayout
          title="Select a user"
          searchBar={
            <div className={styles.searchBar}>
              <InputContainer>
                <Input
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Search by name"
                />
              </InputContainer>
            </div>
          }
        >
          {users.map((user: User, index: number) => (
            <UserItem
              key={index}
              user={user}
              hideActionButtons={true}
              onClick={() => onSelect(user)}
            />
          ))}
        </SearchListLayout>
      </div>
    </div>
  )
}
