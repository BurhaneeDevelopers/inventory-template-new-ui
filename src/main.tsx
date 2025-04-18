/** eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import './index.css'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import SignIn from './pages/Auth/SignIn'
// import Reports from './pages/archive/Inventory/Reports'
import PlaceholderPage from './components/PlaceholderPage'
import Items from './pages/Master/Items'
import Machine from './pages/Master/Machine'
import Customer from './pages/Master/Customer'
import Supplier from './pages/Master/Supplier'
import Process from './pages/Master/Process'
import Users from './pages/Master/Users'
import DesignMaster from './pages/Master/DesignMaster'
import Creation from './pages/Sales-Enquiry/Creation'
import BOM from './pages/Master/BOM'
import Reports from './pages/archive/Inventory/Reports'

// import OrderReceipt from './pages/OrderEnquiry/OrderReceipt'
// import BOMPreparation from './pages/OrderEnquiry/BOMPreparation'
// import Quotations from './pages/OrderEnquiry/Quotations'
// import MaterialRequisition from './pages/OrderEnquiry/MaterialRequisition'
// import GoodsIssue from './pages/Inventory/GoodIssue'
// import POGeneration from './pages/Procurement/POGeneration'
// import GoodsReceiptReturn from './pages/Procurement/GoodsReceiptReturn'
// import GoodsReceiptNote from './pages/Procurement/GoodsReceiptNote'
// import GoodsIssueReturn from './pages/Inventory/GoodsIssueReturn'

// Dashboard
// eslint-disable-next-line react-refresh/only-export-components
const Dashboard = () => <Reports />

// Master pages

// Sales Enquiry pages
// eslint-disable-next-line react-refresh/only-export-components
const SalesEnquiryDesignCreation = () => <PlaceholderPage title="Design Creation" />
// eslint-disable-next-line react-refresh/only-export-components
const SalesEnquiryQuotation = () => <PlaceholderPage title="Quotation" />

// Procurement pages
// eslint-disable-next-line react-refresh/only-export-components
const ProcurementPOGeneration = () => <PlaceholderPage title="Purchase Order Generation" />
// eslint-disable-next-line react-refresh/only-export-components
const ProcurementSalesOrderGeneration = () => <PlaceholderPage title="Sales Order Generation" />
// eslint-disable-next-line react-refresh/only-export-components
const ProcurementCheckInventory = () => <PlaceholderPage title="Check Inventory" />
// eslint-disable-next-line react-refresh/only-export-components
const ProcurementGRN = () => <PlaceholderPage title="GRN" />
// eslint-disable-next-line react-refresh/only-export-components
const ProcurementPurchaseInvoice = () => <PlaceholderPage title="Purchase Invoice" />

// In House Production pages
// eslint-disable-next-line react-refresh/only-export-components
const InHouseInternalOrder = () => <PlaceholderPage title="Internal Order Generation" />
// eslint-disable-next-line react-refresh/only-export-components
const InHouseMaterialIssue = () => <PlaceholderPage title="Material Issue from store" />
// eslint-disable-next-line react-refresh/only-export-components
const InHouseMaterialRequisition = () => (
  <PlaceholderPage title="Material Requisition by Production" />
)
// eslint-disable-next-line react-refresh/only-export-components
const InHouseJobCard = () => <PlaceholderPage title="Job Card" />
// eslint-disable-next-line react-refresh/only-export-components
const InHouseProductionSlip = () => <PlaceholderPage title="Production Slip" />

// External Production pages
// eslint-disable-next-line react-refresh/only-export-components
const ExternalJobWork = () => <PlaceholderPage title="Create Job Work" />
// eslint-disable-next-line react-refresh/only-export-components
const ExternalRawMaterials = () => <PlaceholderPage title="Raw Materials" />
// eslint-disable-next-line react-refresh/only-export-components
const ExternalFinishedGoods = () => <PlaceholderPage title="Finished Goods" />
// eslint-disable-next-line react-refresh/only-export-components
const ExternalJobWorkInvoice = () => <PlaceholderPage title="Job Work Invoice" />

// Sales pages
// eslint-disable-next-line react-refresh/only-export-components
const SalesPackingSlip = () => <PlaceholderPage title="Packing Slip" />
// eslint-disable-next-line react-refresh/only-export-components
const SalesChallan = () => <PlaceholderPage title="Sales Challan" />
// eslint-disable-next-line react-refresh/only-export-components
const SalesInvoice = () => <PlaceholderPage title="Sales Invoice" />
// eslint-disable-next-line react-refresh/only-export-components
const SalesReturn = () => <PlaceholderPage title="Sales Return" />

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<SignIn />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Master module */}
            <Route path="/master" element={<PlaceholderPage title="Master" />} />
            <Route path="/master/items" element={<Items />} />
            <Route path="/master/machine" element={<Machine />} />
            <Route path="/master/process" element={<Process />} />
            <Route path="/master/users-roles" element={<Users />} />
            <Route path="/master/design-master" element={<DesignMaster />} />
            <Route path="/master/bom" element={<BOM />} />
            <Route path="/master/customer" element={<Customer />} />
            <Route path="/master/supplier" element={<Supplier />} />

            {/* Sales Enquiry module */}
            <Route path="/sales-enquiry" element={<PlaceholderPage title="Sales Enquiry" />} />
            <Route path="/sales-enquiry/creation" element={<Creation />} />
            <Route path="/sales-enquiry/design-creation" element={<SalesEnquiryDesignCreation />} />
            <Route path="/sales-enquiry/quotation" element={<SalesEnquiryQuotation />} />

            {/* Procurement module */}
            <Route path="/procurement" element={<PlaceholderPage title="Procurement" />} />
            <Route path="/procurement/po-generation" element={<ProcurementPOGeneration />} />
            <Route
              path="/procurement/sales-order-generation"
              element={<ProcurementSalesOrderGeneration />}
            />
            <Route path="/procurement/check-inventory" element={<ProcurementCheckInventory />} />
            <Route path="/procurement/grn" element={<ProcurementGRN />} />
            <Route path="/procurement/purchase-invoice" element={<ProcurementPurchaseInvoice />} />

            {/* In-house Production module */}
            <Route
              path="/in-house-production"
              element={<PlaceholderPage title="In House Production" />}
            />
            <Route path="/in-house-production/internal-order" element={<InHouseInternalOrder />} />
            <Route path="/in-house-production/material-issue" element={<InHouseMaterialIssue />} />
            <Route
              path="/in-house-production/material-requisition"
              element={<InHouseMaterialRequisition />}
            />
            <Route path="/in-house-production/job-card" element={<InHouseJobCard />} />
            <Route
              path="/in-house-production/production-slip"
              element={<InHouseProductionSlip />}
            />

            {/* External Production module */}
            <Route
              path="/external-production"
              element={<PlaceholderPage title="External Production" />}
            />
            <Route path="/external-production/create-job-work" element={<ExternalJobWork />} />
            <Route path="/external-production/raw-materials" element={<ExternalRawMaterials />} />
            <Route path="/external-production/finished-goods" element={<ExternalFinishedGoods />} />
            <Route
              path="/external-production/job-work-invoice"
              element={<ExternalJobWorkInvoice />}
            />

            {/* Sales module */}
            <Route path="/sales" element={<PlaceholderPage title="Sales" />} />
            <Route path="/sales/packing-slip" element={<SalesPackingSlip />} />
            <Route path="/sales/sales-challan" element={<SalesChallan />} />
            <Route path="/sales/sales-invoice" element={<SalesInvoice />} />
            <Route path="/sales/sales-return" element={<SalesReturn />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
