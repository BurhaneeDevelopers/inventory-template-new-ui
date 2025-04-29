/** eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GlobalRoutes from './components/routes/Routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalRoutes />
  </StrictMode>,
)
