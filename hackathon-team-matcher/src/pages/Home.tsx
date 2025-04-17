// src/pages/Home.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebase } from '../hooks/useFirebase';
import { useMyMLH } from '../hooks/useMyMLH';
import hackathonLogo from '../assets/hackathon-logo.png'; 

const Home: React.FC = () => {
  const { currentUser, loading } = useFirebase();
  const { authorizeWithMyMLH } = useMyMLH();
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  if (currentUser) {
    return <Navigate to="/teams" />;
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-header">
          <h1 className="home-title">Hackathon Team Matcher</h1>
          <p className="home-subtitle">Find your perfect hackathon team based on skills and interests</p>
        </div>
        
        <div className="home-features">
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Find Teammates</h3>
            <p>Connect with other participants who complement your skillset</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Create Teams</h3>
            <p>Form a balanced team with the right mix of skills for your project</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Win Together</h3>
            <p>Great teams lead to great projects and better chances of winning</p>
          </div>
        </div>
        
        <div className="auth-container">
          <button 
            onClick={authorizeWithMyMLH}
            className="mlh-login-button"
          >
            <img 
              src="https://static.mlh.io/brand-assets/logo/official/mlh-logo-color.svg" 
              alt="MLH Logo" 
              className="mlh-logo"
            />
            Sign in with MyMLH
          </button>
          
          <p className="auth-info">
            We use MyMLH to streamline the sign-in process and get your hackathon profile information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;


