import { StrictMode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import RootRouter from './routers/root/root.router'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './contexts/auth-provider/auth.provider'
import LoadingProvider from './contexts/loading-provider/loading.provider'
import LoadingScreen from './components/loading-screen/loading-screen.component'

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen fullViewport />}>
          <LoadingProvider>
            <AuthProvider>
              <RootRouter />
            </AuthProvider>
          </LoadingProvider>

          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                padding: '10px 20px',
                backgroundColor: 'white',
                color: 'var(--primary)',
                fontWeight: 500,
              },
              duration: 4000,
            }}
          />
        </Suspense>
      </BrowserRouter>
    </StrictMode>
  )
}

export default App
