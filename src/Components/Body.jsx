import React from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import Login from "./Login";
import Browse from "./Browse";
import ProtectedRoute from "./ProtectedRoute";


const Body = () => {

  return (

    <Routes>

      {/* ==============================
          LOGIN
      =============================== */}

      <Route
        path="/"
        element={<Login />}
      />


      {/* ==============================
          BROWSE
      =============================== */}

      <Route
        path="/browse"
        element={
          <ProtectedRoute>
            <Browse />
          </ProtectedRoute>
        }
      />

    </Routes>

  );
};


export default Body;