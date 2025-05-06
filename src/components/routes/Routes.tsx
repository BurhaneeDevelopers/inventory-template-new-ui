// import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import '../../index.css'
import PlaceholderPage from '../PlaceholderPage'
import Signin from '@/pages/Auth/SignIn'
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
// import DesignCreation from '@/pages/Sales-Enquiry/DesignCreation'
import Quotation from '@/pages/Sales-Enquiry/Quotation'
import POGeneration from '@/pages/Procurement/POGeneration'
import GRN from '@/pages/Procurement/GRN'
import PurchaseInvoice from '@/pages/Procurement/PurchaseInvoice'
import Common from '@/pages/Master/Common'
import SOGeneration from '@/pages/Sales-Enquiry/SOGeneration'
import Reports from '@/pages/Home/Reports'
import InternalOrder from '@/pages/Material-Management/InternalOrder'
import MaterialIssued from '@/pages/Material-Management/Material-Issue'
import MaterialRequisition from '@/pages/Material-Management/Material-Requisition'
import JobCard from '@/pages/Material-Management/JobCard'
import ProductionSlip from '@/pages/Material-Management/ProductionSlip'
import ProtectedRouteV2 from '../ProtectedRouteV2'
// import PurchaseInvoice from '@/pages/Procurement/PurchaseInvoice'
// import { apiService } from './../../apiService/apiService';

// Dashboard
const Dashboard = () => <Reports />

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

const GlobalRoutes = () => {
  // useEffect(() => {
  //     const refreshSession = async () => {
  //         const refreshToken = localStorage.getItem("refreshToken");
  //         if (!refreshToken) return;

  //         try {
  //             const res = await apiService.post(
  //                 "/refresh-token",
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
          <Route element={<ProtectedRouteV2 />}>
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
              <Route path="/master/commons" element={<Common />} />

              {/* Sales Enquiry module */}
              <Route path="/sales-enquiry" element={<PlaceholderPage title="Sales Enquiry" />} />
              <Route path="/sales-enquiry/creation" element={<Creation />} />
              <Route path="/sales-enquiry/sales-order-generation" element={<SOGeneration />} />
              {/* <Route path="/sales-enquiry/design-creation" element={<DesignCreation />} /> */}
              <Route path="/sales-enquiry/quotation" element={<Quotation />} />

              {/* Procurement module */}
              <Route path="/procurement" element={<PlaceholderPage title="Procurement" />} />
              <Route path="/procurement/po-generation" element={<POGeneration />} />
              {/* <Route path="/procurement/check-inventory" element={<CheckInventory />} /> */}
              <Route path="/procurement/grn" element={<GRN />} />
              <Route path="/procurement/purchase-invoice" element={<PurchaseInvoice />} />

              {/* In-house Production module */}
              <Route
                path="/material-management"
                element={<PlaceholderPage title="Material Management" />}
              />
              <Route path="/material-management/internal-order" element={<InternalOrder />} />
              <Route path="/material-management/material-issue" element={<MaterialIssued />} />
              <Route
                path="/material-management/material-requisition"
                element={<MaterialRequisition />}
              />
              <Route path="/material-management/job-card" element={<JobCard />} />
              <Route path="/material-management/production-slip" element={<ProductionSlip />} />
              <Route path="/material-management/job-card" element={<JobCard />} />
              <Route path="/material-management/production-slip" element={<ProductionSlip />} />

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

export default GlobalRoutes
