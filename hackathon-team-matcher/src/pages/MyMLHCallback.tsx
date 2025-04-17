// src/pages/MyMLHCallback.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMyMLH } from '../hooks/useMyMLH';

const MyMLHCallback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleCallback } = useMyMLH();
  
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    const processAuth = async () => {
      if (hasProcessed) return;
      setHasProcessed(true);
      
      try {
        // Extract code from URL
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        
        if (!code) {
          setStatus('error');
          setErrorMessage('No authorization code received from MyMLH');
          return;
        }
        
        console.log("Processing authorization code:", code);
        
        // Process the code
        const result = await handleCallback(code);
        
        if (result.success) {
          setStatus('success');
          // Wait a moment before redirecting
          setTimeout(() => {
            navigate('/profile');
          }, 2000);
        } else {
          setStatus('error');
          setErrorMessage('Failed to process authentication');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setStatus('error');
        setErrorMessage('An unexpected error occurred during authentication');
      }
    };
    
    processAuth();
  }, [location, handleCallback, navigate, hasProcessed]);

  if (status === 'processing') {
    return (
      <div className="auth-callback-container">
        <div className="auth-callback-card">
          <div className="auth-processing">
            <div className="spinner"></div>
            <h2>Processing Your Login</h2>
            <p>Please wait while we set up your account...</p>
          </div>
        </div>
      </div>
    );
  } else if (status === 'success') {
    return (
      <div className="auth-callback-container">
        <div className="auth-callback-card">
          <div className="auth-success">
            <div className="success-icon">✓</div>
            <h2>Authentication Successful!</h2>
            <p>You're now signed in with MyMLH.</p>
            <p>Redirecting you to your profile...</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="auth-callback-container">
        <div className="auth-callback-card">
          <div className="auth-error">
            <div className="error-icon">×</div>
            <h2>Authentication Error</h2>
            <p>{errorMessage || 'There was a problem signing you in.'}</p>
            <button onClick={() => navigate('/')} className="return-button">
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default MyMLHCallback;