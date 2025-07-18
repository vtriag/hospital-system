import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientRegistration from "./pages/PatientRegistration";
import PatientScreening from "./pages/PatientScreening";
import ServicePanel from "./pages/ServicePanel";
import MedicalService from "./pages/MedicalService";  // Import adicionado
import HeaderController from "./components/HeaderController";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import ProtectRoute from "./components/ProtectRoute";
import Doctor from "./pages/Doctor";
import PatientManagement from "./pages/PatientManagement";

function App() {
  return (
    <Router>
      <HeaderController />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/PatientRegistration"
          element={
            <ProtectRoute>
              <PatientRegistration />
            </ProtectRoute>
          }
        />
        <Route
          path="/PatientScreening"
          element={
            <ProtectRoute>
              <PatientScreening />
            </ProtectRoute>
          }
        />
        <Route
          path="/ServicePanel"
          element={
            <ProtectRoute>
              <ServicePanel />
            </ProtectRoute>
          }
        />
        <Route
          path="/MedicalService"
          element={
            <ProtectRoute>
              <MedicalService />
            </ProtectRoute>
          }
        />
        <Route
          path="/Doctor"
          element={
            <ProtectRoute>
              <Doctor />
            </ProtectRoute>
          }
        />
        <Route
          path="/PatientManagement"
          element={
            <ProtectRoute>
              <PatientManagement />
            </ProtectRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
