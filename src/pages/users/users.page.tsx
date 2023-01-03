import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Pagination from '../../components/pagination/pagination.component'
import UserItem from '../../components/user-item/user-item.component'
import { useErrorHandler } from '../../hooks/use-error-handler/use-error-handler.hook'
import { useLoading } from '../../hooks/use-loading/use-loading.hook'
import { usePagination } from '../../hooks/use-pagination/use-pagination.hook'
import ListLayout from '../../layouts/list/list.layout'
import { User } from '../../models/user.model'
import { getUsers } from '../../services/user.service'

export default function UsersPage() {
  const { pathname } = useLocation()
  const { startLoading, stopLoading } = useLoading()
  const handleError = useErrorHandler()
  const [users, setUsers] = useState<User[]>([])
  const { page, limit, totalPages, setTotalPages, prevPage, nextPage } =
    usePagination({
      initialLimit: 10,
    })

  const fetchUsers = useCallback(async () => {
    startLoading()

    try {
      const { users, pagination } = await getUsers(page, limit)
      setUsers(users)
      setTotalPages(pagination.last)
    } catch (err) {
      handleError(err)
    }

    stopLoading()
  }, [
    page,
    limit,
    setUsers,
    setTotalPages,
    handleError,
    startLoading,
    stopLoading,
  ])

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
      createPath={`${pathname}../users/add`}
      onRefresh={fetchUsers}
    >
      {users.map((user: User, index: number) => (
        <UserItem key={index} user={user} onDelete={fetchUsers} />
      ))}
    </ListLayout>
  )
}
