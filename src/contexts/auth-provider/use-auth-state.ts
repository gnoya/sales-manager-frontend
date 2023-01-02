import { useEffect, useState } from 'react'
import { User } from '../../models/user.model'
import { getUserFromStorage } from '../../services/auth.service'

export function useAuthStates() {
  const [user, setUser] = useState<User | null>(null)
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    const userFromStorage = getUserFromStorage()
    if (userFromStorage) {
      setUser(userFromStorage)
      setSignedIn(true)
    }
  }, [])

  return { user, setUser, signedIn, setSignedIn }
}
