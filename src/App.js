// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepages';
import BillingPage from './pages/BillingPage';
import ContractsPage from './pages/ContractsPage';
import CantinaPage from './pages/CantinaPage';

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/financeiro" element={<BillingPage />} />
          <Route path="/contratos" element={<ContractsPage />} />
          <Route path="/cantina" element={<CantinaPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;