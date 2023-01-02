import { StrictMode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import RootRouter from './routers/root/root.router'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Suspense fallback={<div>Loading... </div>}>
          <RootRouter />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                padding: '10px 20px',
                backgroundColor: 'var(--secondary)',
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
