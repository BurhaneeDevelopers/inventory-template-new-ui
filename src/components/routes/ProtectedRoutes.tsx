// import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import '../../index.css'
import Reports from '@/pages/archive/Inventory/Reports'
import PlaceholderPage from '../PlaceholderPage'
import Signin from '@/pages/Auth/SignIn'
import ProtectedRoute from '../ProtectedRoute'
import Layout from '../Layout'
import Items from '@/pages/Master/Items'
import Machine from '@/pages/Master/Machine'
import Process from '@/pages/Master/Process'
import Users from '@/pages/Master/Users'
import DesignMaster from '@/pages/Master/DesignMaster'
import BOM from '@/pages/Master/BOM'
import Customer from '@/pages/Master/Customer'
import Supplier from '@/pages/Master/Supplier'
import Creation from '@/pages/Sales-Enquiry/Creation'
// import { apiService } from './../../apiService/apiService';

// Dashboard
const Dashboard = () => <Reports />

// Sales Enquiry pages
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

const ProtectedRoutes = () => {
  // useEffect(() => {
  //     const refreshSession = async () => {
  //         const refreshToken = localStorage.getItem("refreshToken");
  //         if (!refreshToken) return;

  //         try {
  //             const res = await apiService.post(
  //                 apiService.v1 + "/refresh-token",
  //                 refreshToken
  //             );
  //             localStorage.setItem("accessToken", res.data.AccessToken);
  //             // Optionally set user info again here
  //         } catch (err) {
  //             console.error("Session expired", err);
  //         }
  //     };

  //     refreshSession();
  // }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/signin" element={<Signin />} />

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
              <Route
                path="/sales-enquiry/design-creation"
                element={<SalesEnquiryDesignCreation />}
              />
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
              <Route
                path="/procurement/purchase-invoice"
                element={<ProcurementPurchaseInvoice />}
              />

              {/* In-house Production module */}
              <Route
                path="/in-house-production"
                element={<PlaceholderPage title="In House Production" />}
              />
              <Route
                path="/in-house-production/internal-order"
                element={<InHouseInternalOrder />}
              />
              <Route
                path="/in-house-production/material-issue"
                element={<InHouseMaterialIssue />}
              />
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
              <Route
                path="/external-production/finished-goods"
                element={<ExternalFinishedGoods />}
              />
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
    </div>
  )
}

export default ProtectedRoutes
