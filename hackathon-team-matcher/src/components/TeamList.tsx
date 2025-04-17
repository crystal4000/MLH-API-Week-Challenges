// src/components/TeamList.tsx
import React, { useEffect } from 'react';
import { useFirebase } from '../hooks/useFirebase';

const TeamList: React.FC = () => {
  const { teams, fetchTeams, currentUser } = useFirebase();
  
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return (
    <div className="team-list">
      <h2>Available Teams</h2>
      {teams.length === 0 ? (
        <p>No teams available. Create one!</p>
      ) : (
        teams.map(team => (
          <div key={team.id} className="team-card">
            <h3>{team.name}</h3>
            <p>{team.description}</p>
            <p><strong>Required Skills:</strong> {team.skills.join(', ')}</p>
            <p>
              <strong>Status:</strong> {team.lookingForMembers ? 'Looking for members' : 'Team is full'}
            </p>
            {team.lookingForMembers && currentUser && !team.members.includes(currentUser.id) && (
              <button className="join-button">
                Request to Join
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TeamList;