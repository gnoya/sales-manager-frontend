import { createContext, ReactNode } from 'react'
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

/*
  Loading Provider is used to store the loading state of the application
*/
export default function LoadingProvider({ children }: LoadingProviderProps) {
  const contextValue = useLoadingState()

  return (
    <loadingContext.Provider value={contextValue}>
      {children}
    </loadingContext.Provider>
  )
}
