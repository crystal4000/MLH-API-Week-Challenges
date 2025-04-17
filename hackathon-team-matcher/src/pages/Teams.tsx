// src/pages/Teams.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import TeamList from '../components/TeamList';
import UserCard from '../components/UserCard';
import { useFirebase } from '../hooks/useFirebase';
import { Team } from '../types';

const Teams: React.FC = () => {
  const { currentUser, users, fetchUsers, loading, createTeam } = useFirebase();
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [teamForm, setTeamForm] = useState<Omit<Team, 'id'>>({
    name: '',
    description: '',
    members: currentUser ? [currentUser.id] : [],
    skills: [],
    lookingForMembers: true,
  });
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const skillsArray = teamForm.skills.length > 0 
      ? teamForm.skills 
      : teamForm.skills.toString().split(',').map(skill => skill.trim()).filter(skill => skill !== '');
    
    const result = await createTeam({
      ...teamForm,
      skills: skillsArray,
    });
    
    if (result.success) {
      setShowCreateTeam(false);
      setTeamForm({
        name: '',
        description: '',
        members: currentUser ? [currentUser.id] : [],
        skills: [],
        lookingForMembers: true,
      });
    }
  };

  return (
    <div className="teams-page">
      <div className="teams-container">
        <div className="section">
          <div className="section-header">
            <h2>Teams</h2>
            <button 
              onClick={() => setShowCreateTeam(!showCreateTeam)} 
              className="create-team-button"
            >
              {showCreateTeam ? 'Cancel' : 'Create Team'}
            </button>
          </div>
          
          {showCreateTeam && (
            <form onSubmit={handleCreateTeam} className="create-team-form">
              <div className="form-group">
                <label htmlFor="name">Team Name</label>
                <input
                  type="text"
                  id="name"
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({...teamForm, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={teamForm.description}
                  onChange={(e) => setTeamForm({...teamForm, description: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="skills">Required Skills (comma-separated)</label>
                <input
                  type="text"
                  id="skills"
                  value={teamForm.skills}
                  onChange={(e) => setTeamForm({...teamForm, skills: e.target.value.split(',').map(s => s.trim())})}
                  placeholder="React, TypeScript, Firebase, etc."
                />
              </div>
              
              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={teamForm.lookingForMembers}
                    onChange={(e) => setTeamForm({...teamForm, lookingForMembers: e.target.checked})}
                  />
                  Looking for members
                </label>
              </div>
              
              <button type="submit" className="submit-button">Create Team</button>
            </form>
          )}
          
          <TeamList />
        </div>
        
        <div className="section">
          <h2>Potential Teammates</h2>
          <div className="users-grid">
            {users
              .filter(user => user.id !== currentUser.id && user.lookingForTeam)
              .map(user => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  showInviteButton={true}
                  onInvite={() => {
                    // Handle invite logic here
                    alert(`Invite sent to ${user.name}`);
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;