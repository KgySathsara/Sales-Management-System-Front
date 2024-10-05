import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard.jsx';
import Sales from './pages/Sales.jsx';
import ProfitLoss from './pages/ProfitAndLoss.jsx';
import Promotions from './pages/Promotions.jsx';
import Offers from './pages/Offers.jsx';
import Refund from './pages/RefundHandling.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/profit&loss" element={<ProfitLoss />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/refund" element={<Refund />} />
      </Routes>
    </Router>
  );
};

export default App;
