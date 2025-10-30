import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landing/LandingPage';
import Home from './pages/Home/Home';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import FriendProfile from './pages/FriendProfile/FriendProfile';
import CommunityProfile from './pages/CommunityProfile/CommunityProfile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { seedDemoData } from './utils/seedData';
import './styles/globals.css';

function App() {
  useEffect(() => {
    // Carregar dados de demonstração na primeira execução
    seedDemoData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Página inicial */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Rotas públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Rotas protegidas */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/friend/:friendId" 
            element={
              <ProtectedRoute>
                <FriendProfile />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/community/:communityId" 
            element={
              <ProtectedRoute>
                <CommunityProfile />
              </ProtectedRoute>
            } 
          />
          
          {/* Rota 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;