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
            path="/create-account"
            element={<SignUp />}
          />

          <Route
            path="/login"
            element={<SignIn />}
          />

        </Routes>
      </Router>

      <Toaster position="top-right" />

    </>
  )
}

export default App
