import { StrictMode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import RootRouter from './routers/root/root.router'

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Suspense fallback={<div>Loading... </div>}>
          <RootRouter />
        </Suspense>
      </BrowserRouter>
    </StrictMode>
  )
}

export default App
