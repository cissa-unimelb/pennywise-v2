import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";
import DashBoard from "../pages/DashBoard";
import Login from "../pages/Login";

function RouterProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomeScreen />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouterProvider;
