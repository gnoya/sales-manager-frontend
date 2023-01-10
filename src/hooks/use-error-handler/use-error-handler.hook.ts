import { AxiosError } from 'axios'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { signOut } from '../../services/auth.service'

/*
  This hook is used to handle errors in the website.
  It can handle the HTTP errors aswell and logs them
  and also report them in a toast.
*/
export function useErrorHandler() {
  function signOutWhenUnauthorized() {
    signOut()
    window.location.replace('/login')
  }

  const createAxiosErrorMessage = useCallback((error: AxiosError): string => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          // TODO: handle the message that comes from the backend
          return 'Bad request'
        case 401:
          signOutWhenUnauthorized()
          return 'Your session expired'
        case 403:
          signOutWhenUnauthorized()
          return 'You are not authorized'
        case 404:
          return 'Not found'
        case 429:
          return 'You are doing too many requests'
        default:
          return 'Unknown error'
      }
    } else if (error.request) {
      return 'Request error'
    } else {
      return 'Unknown error'
    }
  }, [])

  const createErrorMessage = useCallback(
    (error: any) => {
      if (error.isAxiosError) return createAxiosErrorMessage(error)
      return error.message
    },
    [createAxiosErrorMessage]
  )

  const handleError = useCallback(
    (error: any) => {
      console.error(error)
      const msg = createErrorMessage(error)
      toast.error(msg)
    },
    [createErrorMessage]
  )

  return handleError
}
