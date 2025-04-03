import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
// import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import OrderReceipt from './pages/OrderEnquiry/OrderReceipt'
import BOMPreparation from './pages/OrderEnquiry/BOMPreparation'
import Quotations from './pages/OrderEnquiry/Quotations'
import Reports from './pages/Inventory/Reports'
import MaterialRequisition from './pages/OrderEnquiry/MaterialRequisition'
import GoodsIssue from './pages/Inventory/GoodIssue'
import POGeneration from './pages/Procurement/POGeneration'
import GoodsReceiptReturn from './pages/Procurement/GoodsReceiptReturn'
import GoodsReceiptNote from './pages/Procurement/GoodsReceiptNote'
import GoodsIssueReturn from './pages/Inventory/GoodsIssueReturn'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        {/* <Route path="/signin" element={<SignIn />} /> */}
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Reports />} />
            <Route path="inventory">
              <Route path="reports" element={<Reports />} />
              <Route path="goods-issue-return" element={<GoodsIssueReturn />} />
              <Route path="good-issue" element={<GoodsIssue />} />
            </Route>
            {/* Order Enquiry Routes */}
            <Route path="order-enquiry">
              <Route path="order-receipt" element={<OrderReceipt />} />
              <Route path="bom-preparation" element={<BOMPreparation />} />
              <Route path="quotations" element={<Quotations />} />
              <Route path="material-requisition" element={<MaterialRequisition />} />
            </Route>
            <Route path="procurement">
              <Route path="po-generation" element={<POGeneration />} />
              <Route path="goods-receipt-return" element={<GoodsReceiptReturn />} />
              <Route path="goods-receipt-note" element={<GoodsReceiptNote />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
