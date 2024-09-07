import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/";
import Login from "../pages/Login/";
import Home from "../pages/Home/";
import Upload from "../pages/Upload/";
import ProtectedRoute from "../components/ProtectedRoute";
import PageOne from "../pages/PageOne";
import InvoiceGeneration from "../pages/InvoiceGeneration";
import ReimbursementGeneration from "../pages/ReimbursementGeneration";
import {Analytics} from "../pages/Analytics";
import {Header} from "../components/Header";
import {Invoices} from "../pages/Invoices";

function RouterProvider() {
  return <>
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/">
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="analytics"
            element={
              <ProtectedRoute treasurerOnly>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="invoices"
            element={
              <ProtectedRoute treasurerOnly>
                <Invoices />
              </ProtectedRoute>
            }
          />
          <Route
            path="upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route
            path="invoice"
            element={
              <ProtectedRoute>
                <InvoiceGeneration />
              </ProtectedRoute>
            }
          />
          <Route
            path="reimbursement"
            element={
              <ProtectedRoute>
                <ReimbursementGeneration />
              </ProtectedRoute>
            }
          />
          <Route path="pageone" element={<PageOne />} />

        </Route>
        <Route path="*" element={<Home />}/>
      </Routes>
    </HashRouter>
  </>;
}

export default RouterProvider;
