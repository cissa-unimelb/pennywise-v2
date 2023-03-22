import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/";
import Login from "../pages/Login/";
import Home from "../pages/Home/";
import ProtectedRoute from "../components/ProtectedRoute";
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
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default RouterProvider;
