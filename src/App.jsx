import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientRegistration from "./pages/PatientRegistration";
import PatientScreening from "./pages/PatientScreening";
import HeaderController from "./components/HeaderController";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <HeaderController />
      <Routes>
        <Route path="/" element={<PatientRegistration />} />
        <Route path="/PatientScreening" element={<PatientScreening />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
