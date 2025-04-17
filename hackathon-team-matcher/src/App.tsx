// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Teams from './pages/Teams';
import MyMLHCallback from './pages/MyMLHCallback';
import { useFirebase } from './hooks/useFirebase';
import './App.css';

// Protected route component
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { currentUser, loading } = useFirebase();
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  return currentUser ? <>{element}</> : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/teams" element={<ProtectedRoute element={<Teams />} />} />
            <Route path="/auth/mlh/callback" element={<MyMLHCallback />} />
            
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;