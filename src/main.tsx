import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import OrderReceipt from './pages/OrderEnquiry/OrderReceipt'
import BOMPreparation from './pages/OrderEnquiry/BOMPreparation'
import Quotations from './pages/OrderEnquiry/Quotations'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        {/* <Route path="/signin" element={<SignIn />} /> */}
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            {/* Order Enquiry Routes */}
            <Route path="order-enquiry">
              <Route path="order-receipt" element={<OrderReceipt />} />
              <Route path="bom-preparation" element={<BOMPreparation />} />
              <Route path="quotations" element={<Quotations />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
