import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import ProfilePage from './components/ProfilePage';
import SubjectsPage from './components/SubjectsPage';
import ProtectedRoute from './components/ProtectedRoute';
import CareerGoalPage from './pages/CareerGoalPage';
import { ThemeProvider } from "./context/ThemeContext";
import './utils/axiosConfig';
import ContributePage from './pages/ContributePage';
import UnitPage from './components/UnitPage';
import Contact from './components/Contact';
import About from './components/About';
import Features from './components/Features';

import './utils/axiosConfig'; // ensure Axios config loads

import QuizPage from './components/QuizPage'; // ✅ ADD THIS LINE
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <ThemeProvider>
 
      <Router>
             
  <ToastContainer />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/quizzes" element={<QuizPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/goal/:goal" element={
            <ProtectedRoute>
              <CareerGoalPage />
            </ProtectedRoute>
          } />

          <Route path="/subjects/:subjectId/units" element={<UnitPage />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/subjects/:semesterId" element={<SubjectsPage />} />

          <Route path="/contribute" element={<ContributePage />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
