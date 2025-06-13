import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignupPage from './components/SignupPage'; // ✅ import
import LoginPage from './components/LoginPage'; // ✅ import LoginPage
import DashboardPage from './components/DashboardPage'; // ✅ import
<<<<<<< Updated upstream
import './utils/axiosConfig';
import ProtectedRoute from './components/ProtectedRoute';
=======
>>>>>>> Stashed changes



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} /> {/* ✅ New */}
        <Route path="/login" element={<LoginPage />} /> {/* ✅ Add this */}
<<<<<<< Updated upstream
<Route path="/dashboard" element={
  <ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>
} />
=======
        <Route path="/dashboard" element={<DashboardPage />} /> {/* ✅ Dashboard */}
>>>>>>> Stashed changes

      </Routes>
    </Router>
    
  );
}

export default App;
