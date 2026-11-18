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
import UAECustomerDashboard from "./User-Dashboard/Pages/UAECustomerDashboard";

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

        </Routes>
      </Router>

      <Toaster position="top-right" />

    </>
  )
}

export default App
