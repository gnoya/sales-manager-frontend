import * as Yup from 'yup'
import { useErrorHandler } from '../../hooks/use-error-handler/use-error-handler.hook'
import { useLoading } from '../use-loading/use-loading.hook'
import { signIn } from '../../services/auth.service'
import { useAuth } from '../use-auth/use-auth.hook'

/*
  Hook used for the login form
*/
export function useAuthForm() {
  const { isLoading, startLoading, stopLoading } = useLoading()
  const { setUser, setSignedIn } = useAuth()
  const handleError = useErrorHandler()

  const initialValues = {
    email: '',
    password: '',
  }

  const validation = Yup.object({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  async function submit(values: typeof initialValues) {
    startLoading()
    try {
      const result = await signIn(values)
      setUser(result)
      setSignedIn(true)
    } catch (error) {
      handleError(error)
    }
    stopLoading()
  }

  return {
    initialValues,
    submit,
    validation,
    isLoading,
  }
}
