import { createContext, ReactNode } from 'react'
import { User } from '../../models/user.model'
import { useLoadingState } from './use-loading-state.hook'

class LoadingContext {
  isLoading: boolean = false
  startLoading() {}
  stopLoading() {}
}

export const loadingContext = createContext(new LoadingContext())

interface LoadingProviderProps {
  children?: ReactNode
}
export default function LoadingProvider(props: LoadingProviderProps) {
  const contextValue = useLoadingState()

  return (
    <loadingContext.Provider value={contextValue}>
      {props.children}
    </loadingContext.Provider>
  )
}
