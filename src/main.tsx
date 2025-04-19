/** eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProtectedRoutes from './components/routes/ProtectedRoutes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProtectedRoutes />
  </StrictMode>,
)
