import { useCallback, useEffect, useState } from 'react'
import Pagination from '../../components/pagination/pagination.component'
import UserItem from '../../components/user-item/user-item.component'
import { usePagination } from '../../hooks/use-pagination/use-pagination.hook'
import ListLayout from '../../layouts/list/list.layout'
import { User } from '../../models/user.model'
import { getUsers } from '../../services/user.service'
import styles from './users.page.module.css'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const { page, limit, totalPages, setTotalPages, prevPage, nextPage } =
    usePagination({
      initialLimit: 10,
    })

  const fetchUsers = useCallback(async () => {
    const { users, pagination } = await getUsers(page, limit)
    setUsers(users)
    setTotalPages(pagination.last)
  }, [page, limit, setUsers, setTotalPages])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <ListLayout
      pagination={
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPrevPage={prevPage}
          onNextPage={nextPage}
        />
      }
      title="Users"
      createPath="/users-add"
      onRefresh={fetchUsers}
    >
      {users.map((user: User, index: number) => (
        <UserItem key={index} user={user} onDelete={fetchUsers} />
      ))}
    </ListLayout>
  )
}
