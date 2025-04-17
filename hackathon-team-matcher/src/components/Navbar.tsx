// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../hooks/useFirebase';
import { useMyMLH } from '../hooks/useMyMLH';

const Navbar: React.FC = () => {
  const { currentUser, signOut } = useFirebase();
  const { authorizeWithMyMLH } = useMyMLH();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Hackathon Team Matcher</Link>
      </div>
      <div className="navbar-menu">
        {currentUser ? (
          <>
            <Link to="/profile" className="navbar-item">Profile</Link>
            <Link to="/teams" className="navbar-item">Teams</Link>
            <button className="navbar-item button" onClick={signOut}>Logout</button>
          </>
        ) : (
          <button 
            className="navbar-item button mlh-nav-button" 
            onClick={authorizeWithMyMLH}
          >
            <img 
              src="https://static.mlh.io/brand-assets/logo/official/mlh-logo-color.svg" 
              alt="MLH Logo" 
              className="mlh-nav-logo"
            />
            Sign in with MLH
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;