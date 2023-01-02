import { useContext } from 'react'
import { loadingContext } from '../../contexts/loading-provider/loading.provider'

export function useLoading() {
  return useContext(loadingContext)
}
