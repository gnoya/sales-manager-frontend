import { useContext } from 'react'
import { loadingContext } from '../../contexts/loading-provider/loading.provider'

/*
  Hook that uses the context given by the LoadingProvider
*/
export function useLoading() {
  return useContext(loadingContext)
}
