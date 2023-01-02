import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import './nprogress-custom.css'

export function useLoadingState() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const np = useMemo(() => nprogress.configure({ showSpinner: true }), [])

  const startLoading = useCallback(() => setIsLoading(true), [setIsLoading])
  const stopLoading = useCallback(() => setIsLoading(false), [setIsLoading])

  useEffect(() => {
    if (isLoading) np.start()
    else np.done()
    return () => {
      np.done()
    }
  }, [isLoading, np])

  return { isLoading, startLoading, stopLoading }
}
