import React, { useEffect, useState, lazy, Suspense } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axiosRequest from "./axios-request";
import Home from "./Website/Pages/Home";
import SignUp from "./Website/Pages/SignUp";
import UAECustomerDashboard from "./User-Dashboard/Pages/UAECustomerDashboard";
import SignIn from "./User-Dashboard/Pages/SignIn";
import {
  PrivacyPolicy,
  TermsAndConditions
} from "./Website/Pages/UAELegalPages";
import UAEComingSoon from "./Website/Pages/UAEComingSoon";
import UAEAdminDashboard from "./Admin-Dashboard/Pages/UAEAdminDashboard";

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <Router>
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/user/dashboard/*"
            element={<UAECustomerDashboard />}
          />

          <Route
            path="/signup"
            element={<UAEComingSoon />}
          />

          <Route
            path="/login"
            element={<UAEComingSoon />}
          />


          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy />}
          />

          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />

          <Route
            path="/admin/dashboard/*"
            element={<UAEAdminDashboard />}
          />

        </Routes>
      </Router>

      <Toaster position="top-right" />

    </>
  )
}

export default App
