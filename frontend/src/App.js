import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignupPage from './components/SignupPage'; // ✅ import
import LoginPage from './components/LoginPage'; // ✅ import LoginPage
import DashboardPage from './components/DashboardPage'; // ✅ import
import './utils/axiosConfig';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from "./components/ProfilePage";
import { ThemeProvider } from "./context/ThemeContext";


<ThemeProvider>
  <App />
</ThemeProvider>


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} /> {/* ✅ New */}
        <Route path="/login" element={<LoginPage />} /> {/* ✅ Add this */}
        <Route path="/profile" element={<ProfilePage />} />
<Route path="/dashboard" element={
  <ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>
  
} />

      </Routes>
    </Router>
    
  );
}

export default App;
