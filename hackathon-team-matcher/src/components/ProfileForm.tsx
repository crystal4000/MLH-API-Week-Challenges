// src/components/ProfileForm.tsx
import React, { useState } from 'react';
import { User } from '../types';
import { useFirebase } from '../hooks/useFirebase';

interface ProfileFormProps {
  user?: User;
  isSignUp?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user, isSignUp = false }) => {
  const { createUser, updateProfile, signIn } = useFirebase();
  
  const [formData, setFormData] = useState({
    email: user?.email || '',
    password: '',
    name: user?.name || '',
    skills: user?.skills.join(', ') || '',
    interests: user?.interests.join(', ') || '',
    lookingForTeam: user?.lookingForTeam ?? true as boolean,
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const skillsArray = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
    const interestsArray = formData.interests.split(',').map(interest => interest.trim()).filter(interest => interest !== '');

    try {
      if (isSignUp) {
        const result = await createUser(formData.email, formData.password, {
          name: formData.name,
          email: formData.email,
          skills: skillsArray,
          interests: interestsArray,
          lookingForTeam: formData.lookingForTeam,
        });
        
        if (result.success) {
          setSuccess('Account created successfully!');
        } else {
          setError('Failed to create account.');
        }
      } else if (user) {
        const result = await updateProfile(user.id, {
          name: formData.name,
          skills: skillsArray,
          interests: interestsArray,
          lookingForTeam: formData.lookingForTeam,
        });
        
        if (result.success) {
          setSuccess('Profile updated successfully!');
        } else {
          setError('Failed to update profile.');
        }
      } else {
        const result = await signIn(formData.email, formData.password);
        
        if (!result.success) {
          setError('Invalid email or password.');
        }
      }
    } catch (error) {
      setError('An error occurred.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      {(isSignUp || !user) && (
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      )}
      
      {(isSignUp || !user) && (
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={isSignUp}
          />
        </div>
      )}
      
      {(isSignUp || user) && (
        <>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="skills">Skills (comma-separated)</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, TypeScript, Firebase, etc."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="interests">Interests (comma-separated)</label>
            <input
              type="text"
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="Web Development, AI, Blockchain, etc."
            />
          </div>
          
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="lookingForTeam"
                checked={formData.lookingForTeam}
                onChange={(e) => setFormData({...formData, lookingForTeam: e.target.checked})}
              />
              I'm looking for a team
            </label>
          </div>
        </>
      )}
      
      <button type="submit" className="submit-button">
        {isSignUp ? 'Sign Up' : user ? 'Update Profile' : 'Sign In'}
      </button>
    </form>
  );
};

export default ProfileForm;
