// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import ProfilePage from './components/ProfilePage';
import SubjectsPage from './components/SubjectsPage';
import ProtectedRoute from './components/ProtectedRoute';
import UnitPage from './components/UnitPage';
import { ThemeProvider } from "./context/ThemeContext";
import './utils/axiosConfig'; // ensure Axios config loads

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/subjects/:subjectId/units" element={<UnitPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/subjects/:semesterId" element={<SubjectsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
