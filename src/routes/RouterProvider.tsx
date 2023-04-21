import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/";
import Login from "../pages/Login/";
import Home from "../pages/Home/";
import Upload from "../pages/Upload/";
import ProtectedRoute from "../components/ProtectedRoute";
import PageOne from "../pages/PageOne";
import InvoiceGeneration from "../pages/InvoiceGeneration";
function RouterProvider() {
  return (
    <HashRouter>
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
            path="upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="invoice" element={<InvoiceGeneration />} />
          <Route path="pageone" element={<PageOne/>} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default RouterProvider;
