// src/pages/Profile.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import { useFirebase } from '../hooks/useFirebase';

const Profile: React.FC = () => {
  const { currentUser, loading } = useFirebase();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="profile-page">
      <h1>Your Profile</h1>
      <ProfileForm user={currentUser} />
    </div>
  );
};

export default Profile;
