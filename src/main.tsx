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
import Page from './components/constants/layout/Page'
import Items from './pages/Master/Items'

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
const Dashboard = () => <PlaceholderPage title="Dashboard" />

// Master pages
const MasterItems = () => <Items />
const MasterMachine = () => <Page title="Machine" />
const MasterProcess = () => <Page title="Process" />
const MasterUsersRoles = () => <Page title="Users/Roles/Right" />
const MasterDesign = () => <Page title="Design Master" />
const MasterBOM = () => <Page title="BOM" />
const MasterCustomer = () => <Page title="Customer" />
const MasterSupplier = () => <Page title="Supplier" />

// Sales Enquiry pages
const SalesEnquiryCreation = () => <PlaceholderPage title="Sales Enquiry Creation" />
const SalesEnquiryDesignCreation = () => <PlaceholderPage title="Design Creation" />
const SalesEnquiryQuotation = () => <PlaceholderPage title="Quotation" />

// Procurement pages
const ProcurementPOGeneration = () => <PlaceholderPage title="Purchase Order Generation" />
const ProcurementSalesOrderGeneration = () => <PlaceholderPage title="Sales Order Generation" />
const ProcurementCheckInventory = () => <PlaceholderPage title="Check Inventory" />
const ProcurementGRN = () => <PlaceholderPage title="GRN" />
const ProcurementPurchaseInvoice = () => <PlaceholderPage title="Purchase Invoice" />

// In House Production pages
const InHouseInternalOrder = () => <PlaceholderPage title="Internal Order Generation" />
const InHouseMaterialIssue = () => <PlaceholderPage title="Material Issue from store" />
const InHouseMaterialRequisition = () => (
  <PlaceholderPage title="Material Requisition by Production" />
)
const InHouseJobCard = () => <PlaceholderPage title="Job Card" />
const InHouseProductionSlip = () => <PlaceholderPage title="Production Slip" />

// External Production pages
const ExternalJobWork = () => <PlaceholderPage title="Create Job Work" />
const ExternalRawMaterials = () => <PlaceholderPage title="Raw Materials" />
const ExternalFinishedGoods = () => <PlaceholderPage title="Finished Goods" />
const ExternalJobWorkInvoice = () => <PlaceholderPage title="Job Work Invoice" />

// Sales pages
const SalesPackingSlip = () => <PlaceholderPage title="Packing Slip" />
const SalesChallan = () => <PlaceholderPage title="Sales Challan" />
const SalesInvoice = () => <PlaceholderPage title="Sales Invoice" />
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
            <Route path="/master/items" element={<MasterItems />} />
            <Route path="/master/machine" element={<MasterMachine />} />
            <Route path="/master/process" element={<MasterProcess />} />
            <Route path="/master/users-roles" element={<MasterUsersRoles />} />
            <Route path="/master/design-master" element={<MasterDesign />} />
            <Route path="/master/bom" element={<MasterBOM />} />
            <Route path="/master/customer" element={<MasterCustomer />} />
            <Route path="/master/supplier" element={<MasterSupplier />} />

            {/* Sales Enquiry module */}
            <Route path="/sales-enquiry" element={<PlaceholderPage title="Sales Enquiry" />} />
            <Route path="/sales-enquiry/creation" element={<SalesEnquiryCreation />} />
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
