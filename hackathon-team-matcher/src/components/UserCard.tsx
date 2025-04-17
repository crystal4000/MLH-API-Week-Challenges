// src/components/UserCard.tsx
import React from 'react';
import { User } from '../types';

interface UserCardProps {
  user: User;
  onInvite?: () => void;
  showInviteButton?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, onInvite, showInviteButton = false }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p><strong>Skills:</strong> {user.skills.join(', ')}</p>
      <p><strong>Interests:</strong> {user.interests.join(', ')}</p>
      <p>
        <strong>Status:</strong> {user.lookingForTeam ? 'Looking for a team' : 'Not looking for a team'}
      </p>
      {showInviteButton && user.lookingForTeam && (
        <button onClick={onInvite} className="invite-button">
          Invite to Team
        </button>
      )}
    </div>
  );
};

export default UserCard;